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
5. Generate Prisma client:
   ```sh
   prisma generate
   ```
6. Start the FastAPI server:
   ```sh
   uvicorn main:app --reload
   ```
7. The backend should now be running at `http://localhost:8000`

---


## Contributing Guidelines


1. **Fork the repository** and clone it locally:
   
   ```sh
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
1. SayGex: 25
2. Clueless : 10
3. Talaash : 10
4. CypherSquad: 0
5. Abenders: 0
6. DeVvoyagers: 0
7. 404 Not Found : 0
8. Anveshika: 0
9. Low Day: 0
10. BitbyBit: 0
11. Codestorm : 0
12. Bototrons: 0
13. Anveshika : 0
14. Team : 0
15. Gitify: 0
16. Thund3rbird : 0
17. Aquaman: 0
18. what is git?: 0
19. Quark Script: 0
20. Team 201: 0
21. Team Mast Orbiters: 0
22. Team UNO: 0
23. Yeagerists: 0
24. Kisi ka laptop kisi ka code: 0
25. Bottle cap: 0
26. Code phatt gya: 0
27. oggy & the cockroaches : 0
28. Non Coders: 0
29. Kshitij Prasad : 0
30. Merge Masters : 0
31. Alpha four: 0
32. OpnSrc: 0
33. Code 404: 0
34. Merge Masters: 0
35. code overflow: 0
36. Dora team: 0
37. Error : 0
38. Tech Titans : 0
39. Super queens: 0
40. Codepushers: 0
41. Ctrl + c & Ctrl + v: 0
42. Strive Squad : 0
43. Game changers: 0
44. DQueen: 0
45. RedEye: 0
46. Aatu Jhaatu: 0
47. Ace: 0
48. Binary: 0
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

