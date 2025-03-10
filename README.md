# Commit And Conquer

## Overview
The repository contains a full-stack application with a **Next.js** frontend and a **FastAPI** backend, with connection to a postgresql (use of neondb is recommended)...

## Folder Structure
```
repo-root/
├── CLIENT/   # Next.js frontend application
├── SERVER/   # FastAPI backend
```

---

## Prerequisites
- Ensure you have **Node.js** installed for setting up nextjs.
-  **Python 3** installed for setting up FASTAPI .


## Setup Instructions

### CLIENT (Frontend - Next.js)

1. Navigate to the `CLIENT` folder:
   ```sh
   cd CLIENT
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. The frontend should now be running at `http://localhost:3000`

---

### SERVER (Backend - FastAPI)

1. Navigate to the `SERVER` folder:
   ```sh
   cd SERVER
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   ```
3. Activate the virtual environment:
   - **Windows:**
     ```sh
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```sh
     source venv/bin/activate
     ```
4. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
5. Set up environment variables:
   - Create a `.env` file in the SERVER directory
   - Add your DATABASE_URL:
     ```
     DATABASE_URL="postgresql://user:password@host:port/database"
     ```
   - Replace the connection details with your actual database credentials
6. Generate Prisma client:
   ```sh
   prisma generate
   ```
7. Start the FastAPI server:
   ```sh
   uvicorn main:app --reload
   ```
8. The backend should now be running at `http://localhost:8000`

---


## Contributing Guidelines


1. **Fork the repository** and clone it locally:
   
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
4. Make your changes in the `main` branch of your fork.
5. Commit your changes with a structured message:
   - Format:
     ```
     Update <file-name>
     
     Fixes #<issue-number>  
     Team <team-id>
     ```
   - Example:
     ```
     Update main.dart
     
     Fixes #1  
     Team 12
     ```
6. Push your changes to your forked repository:
   ```sh
   git push origin main
   ```
7. Go to the **original repository** and create a **pull request (PR)** from your fork’s `main` branch.

8. A maintainer will review and merge your PR.

 **DO NOT MERGE YOUR CODE TO THE MAIN BRANCH OF THE MAIN REPOSITORY**

---



## Notes
- The frontend and backend should run concurrently for full functionality.
- Modify environment variables as needed.
- If a team finds a issue or bugs they need to create it with a tag called Player-issue

---

## LeaderBoard 🏆

<!-- LEADERBOARD_START -->
1. CypherSquad: 0
2. Abenders: 0
3. DeVvoyagers: 0
4. 404 Not Found : 0
5. Anveshika: 0
6. Low Day: 0
7. BitbyBit: 0
8. Codestorm : 0
9. Bototrons: 0
10. Anveshika : 0
11. Team : 0
12. SayGex: 0
13. Gitify: 0
14. Thund3rbird : 0
15. Clueless : 0
16. Aquaman: 0
17. what is git?: 0
18. Quark Script: 0
19. Team 201: 0
20. Team Mast Orbiters: 0
21. Team UNO: 0
22. Yeagerists: 0
23. Kisi ka laptop kisi ka code: 0
24. Bottle cap: 0
25. Code phatt gya: 0
26. oggy & the cockroaches : 0
27. Non Coders: 0
28. Kshitij Prasad : 0
29. Merge Masters : 0
30. Alpha four: 0
31. OpnSrc: 0
32. Code 404: 0
33. Merge Masters: 0
34. code overflow: 0
35. Dora team: 0
36. Error : 0
37. Tech Titans : 0
38. Super queens: 0
39. Codepushers: 0
40. Ctrl + c & Ctrl + v: 0
41. Strive Squad : 0
42. Game changers: 0
43. DQueen: 0
44. RedEye: 0
45. Aatu Jhaatu: 0
46. Ace: 0
47. Binary: 0
48. Talaash : 0
49. Tech Titans: 0
50. Cyber_Coders: 0
51. Batch D2: 0
52. Code-Cartel: 0
53. Hackity: 0
54. AS: 0
55. Ujwal Kumar B R : 0
56. SYNTAX ERROR: 0
57. Hack: 0
58. TEAM NDC: 0
59. Vinith Chavan : 0
60. Sujeet: 0
61. BugSync: 0
62. Byte Jinx: 0
63. Caffeine Overdose : 0
64. Dev cardio: 0
65. Tech Titans : 0
66. It'sworkingsomehow : 0
67. Hacktivate: 0
68. PR RANGERS: 0
69. Leviathan Squad: 0
70. Octagram: 0
71. Gitcoders: 0
<!-- LEADERBOARD_END -->

