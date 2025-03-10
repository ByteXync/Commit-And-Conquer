function InternshipCard({ internship, onToggleStatus }) {
    return (
      <div className="internship-card">
        <h3>{internship.title}</h3>
        <p>{internship.company} - {internship.location}</p>
        <p>Stipend: ${internship.stipend}</p>
        <p>Duration: {internship.duration} months</p>
        <button 
          onClick={() => onToggleStatus(internship.id)}
          className={internship.isActive ? "delete-btn" : "restore-btn"}
        >
          {internship.isActive ? "Delete" : "Restore"}
        </button>
      </div>
    );
  }
  
  // In your main internships component
  function InternshipsPage() {
    const [activeInternships, setActiveInternships] = useState([]);
    const [deletedInternships, setDeletedInternships] = useState([]);
    const [showDeleted, setShowDeleted] = useState(false);
    
    useEffect(() => {
      // Fetch active internships
      fetchActiveInternships();
      // Fetch deleted internships
      fetchDeletedInternships();
    }, []);
    
    const fetchActiveInternships = async () => {
      const response = await fetch('/api/fetchinternships');
      const data = await response.json();
      setActiveInternships(data);
    };
    
    const fetchDeletedInternships = async () => {
      const response = await fetch('/api/fetchdeletedinternships');
      const data = await response.json();
      setDeletedInternships(data);
    };
    
    const handleToggleStatus = async (id) => {
      const response = await fetch(`/api/toggleinternship/${id}`, {
        method: 'PUT'
      });
      
      if (response.ok) {
        // Refresh both lists
        fetchActiveInternships();
        fetchDeletedInternships();
      }
    };
    
    return (
      <div>
        <h1>Internships</h1>
        
        <div className="toggle-view">
          <button onClick={() => setShowDeleted(false)} className={!showDeleted ? 'active' : ''}>
            Active Internships
          </button>
          <button onClick={() => setShowDeleted(true)} className={showDeleted ? 'active' : ''}>
            Deleted Internships
          </button>
        </div>
        
        <div className="internships-list">
          {!showDeleted ? (
            activeInternships.map(internship => (
              <InternshipCard 
                key={internship.id} 
                internship={internship} 
                onToggleStatus={handleToggleStatus} 
              />
            ))
          ) : (
            deletedInternships.map(internship => (
              <InternshipCard 
                key={internship.id} 
                internship={internship} 
                onToggleStatus={handleToggleStatus} 
              />
            ))
          )}
        </div>
      </div>
    );
  }