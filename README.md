🌱 Emission Route Recommender

This is a prototype that compares transport options in Singapore and highlights the lowest-emission route.

📂 Project Structure
emission-route/
├─ public/              # static assets
├─ src/
│  ├─ emission.js       # emission + speed constants & calculator
│  ├─ geo.js            # distance calculations (Haversine, road factor)
│  ├─ places.js         # predefined SG locations
│  ├─ miniMap.js        # simple SVG-based route visualizer
│  ├─ ui.js             # renders sidebar results & interactions
│  ├─ main.js           # app entry point
│  └─ style.css         # styles (grid layout, sidebar, cards, map)
├─ index.html           # app container
├─ package.json         # dependencies & scripts
├─ package-lock.json    # dependency lock file
├─ .gitignore           # ignored files (node_modules, .env, etc.)
├─ .env.example         # example env file (for future API integration)
└─ README.md            # documentation (this file)

🚀 Getting Started

1. Clone this repo
git clone https://github.com/<your-username>/emission-route.git
cd emission-route
2. Install dependencies
npm install
3. Run the dev server
npm run dev

Once done, open the URL shown in your terminal.
