🌎 **Emission Route Map**

This is a prototype that compares transport options in Singapore and recommends the lowest-emission route.  

✨ **Features**

- Compare **emission factors** for different modes of transport  
- Estimate **Calories burned** based on activity type and duration 
- **Cost estimation** of each transport mode 
- **Top 3 Best Routes** with the lowest emisson      

🛠️ **Tech Stack**

- **Vite + Vanilla JS** for bundling  
- **HTML5 + CSS3** (custom styles, no frameworks)  
- **SVG rendering** for the mini-map  
- No backend required – all calculations are done client-side
  
🚀 **Getting Started**

1. Clone this repo
``` 
git clone https://github.com/<your-username>/emission-route.git
cd emission-route
```
2. Install dependencies
```
npm install
```
3. Run the dev server
```
npm run dev
```

Once done, open the URL shown in your terminal.

📂 **Project Structure**
```
emission-route/
├── node_modules/ 
├── public/             # static assets (favicon, etc.)
├── src/
│   ├── calories.js     # calorie calculations
│   ├── cost.js         # cost calculations
│   ├── emission.js     # emission factors & speed models
│   ├── geo.js          # haversine distance + helpers
│   ├── main.js         # app entry, handles UI + comparisons
│   ├── miniMap.js      # SVG mini map rendering
│   ├── places.js       # list of places with lat/lon
│   ├── ui.js           # UI rendering (cards, results, tabs)
│   └── style.css       # app styling
├── index.html          # main app HTML
├── package.json
└── README.md
```
