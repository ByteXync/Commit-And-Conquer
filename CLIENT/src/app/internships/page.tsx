'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

interface Internship {
  id?: number;
  title: string;
  description: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
}

const InternshipPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [formData, setFormData] = useState<Internship>({
    title: "",
    description: "",
    company: "",
    location: "",
    stipend: "",
    duration: ""
  });

  useEffect(() => {
    fetchInternships();
  }, []);

  // ✅ Fetch internships from API
  const fetchInternships = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/fetchinternships");
      if (!response.ok) throw new Error("Failed to fetch internships");
      const data: Internship[] = await response.json();
      setInternships(data);
    } catch (err) {
      setError("Error fetching internships");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete internship
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this internship?")) return;
    try {
      const response = await fetch(`http://localhost:8000/api/deleteinternship/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error deleting internship");
      fetchInternships();
    } catch (err) {
      setError("Error deleting internship");
    }
  };

  // ✅ Open edit modal
  const handleEdit = (internship: Internship) => {
    setEditingInternship(internship);
    setFormData(internship);
    setModalOpen(true);
  };

  // ✅ Open create modal
  const handleCreate = () => {
    setEditingInternship(null);
    setFormData({ title: "", description: "", company: "", location: "", stipend: "", duration: "" });
    setModalOpen(true);
  };

  // ✅ Handle form submission (Add/Edit internship)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingInternship ? `http://localhost:8000/api/updateinternship/${editingInternship.id}` : "http://localhost:8000/api/addinternships";
    const method = editingInternship ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to submit internship");
      }

      setModalOpen(false);
      fetchInternships();
    } catch (err) {
      setError("Failed to submit internship");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCreate}>New Internship</Button>
        <Button variant="outline" onClick={() => window.history.back()}>Back</Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {internships.map((internship) => (
            <Card key={internship.id} className="border border-blue-300 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-700">{internship.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Company:</strong> {internship.company}</p>
                <p><strong>Location:</strong> {internship.location}</p>
                <p><strong>Stipend:</strong> ${internship.stipend}</p>
                <p><strong>Duration:</strong> {internship.duration} months</p>
                <div className="flex justify-between mt-4">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleEdit(internship)}>Edit</Button>
                  <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleDelete(internship.id!)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-blue-50">
          <DialogHeader>
            <DialogTitle className="text-blue-700">{editingInternship ? "Edit Internship" : "New Internship"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <Label htmlFor={key} className="text-blue-600">{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                <Input
                  id={key}
                  className="border-blue-400 focus:ring-blue-500 focus:border-blue-500"
                  value={formData[key as keyof Internship]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  required
                />
              </div>
            ))}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" type="submit">{editingInternship ? "Update" : "Create"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InternshipPage;
