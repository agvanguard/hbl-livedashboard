# Healthy Backlog Limits Dashboard

A dashboard to monitor team capacity and unassigned tickets across support teams.

## 📋 Quick Setup Guide

### Step 1: Upload to GitHub

1. **Create a new repository on GitHub:**
   - Go to [github.com](https://github.com) and log in
   - Click the "+" icon in the top right → "New repository"
   - Repository name: `hbl-dashboard`
   - Choose: **Public** (so the CSV file can be accessed)
   - Click "Create repository"

2. **Upload all files:**
   - Click "uploading an existing file"
   - Drag and drop ALL files from this folder
   - Click "Commit changes"

### Step 2: Update the CSV URL

1. In your GitHub repository, click on: `public/data.csv`
2. Click the "Raw" button at the top
3. Copy the URL (it will look like: `https://raw.githubusercontent.com/YOUR_USERNAME/hbl-dashboard/main/public/data.csv`)
4. Go back to your repository
5. Click on: `src/App.jsx`
6. Click the pencil icon (Edit this file)
7. Find line 10 and replace:
   ```javascript
   const CSV_URL = 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/public/data.csv';
   ```
   With your actual URL from step 3
8. Click "Commit changes"

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "Add New Project"
4. Import your `hbl-dashboard` repository
5. Click "Deploy"
6. Wait 1-2 minutes

**Your dashboard is now live!** Vercel will give you a URL like: `https://hbl-dashboard.vercel.app`

---

## 📊 Weekly Data Updates

### To update your CSV file every week:

1. Go to your GitHub repository
2. Click on: `public/data.csv`
3. Click the pencil icon (Edit this file)
4. Update the data following this format:
   ```
   Subgroup,Team,Healthy Backlog Limit (HBL*),# of Unassigned Tickets
   Admin Support,Admin APJ,6,1
   Admin Support,Admin EMEA,10,2
   ```
5. Click "Commit changes"
6. Users click "Refresh Data" on the dashboard to see the latest numbers

**That's it!** The dashboard automatically pulls from the updated CSV file.

---

## 📁 Project Structure

```
hbl-dashboard/
├── public/
│   ├── index.html          # Main HTML file
│   └── data.csv            # YOUR DATA - Update this weekly!
├── src/
│   ├── App.jsx             # Dashboard component
│   └── index.js            # React entry point
├── package.json            # Dependencies
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

---

## 🔄 Dashboard Features

- ✅ Simple table view of all teams
- ✅ Shows Subgroup, Team, HBL, and Unassigned Tickets
- ✅ Refresh button to load latest data
- ✅ Note about 25% unassigned ticket limit
- ✅ Mobile-friendly design

---

## 💡 Important Notes

- **The unassigned ticket limit is 25% of the HBL**
- Keep the CSV format exactly as shown (4 columns)
- Update the CSV file on GitHub weekly
- Users can refresh the dashboard anytime to get the latest data
- The dashboard is publicly accessible - no login required

---

## 🆘 Troubleshooting

**Problem: Dashboard shows "Failed to fetch data"**
- Solution: Make sure you updated the CSV_URL in `src/App.jsx` with your GitHub raw URL

**Problem: Data not updating after CSV edit**
- Solution: Click "Refresh Data" button on the dashboard

**Problem: Can't find the Raw button**
- Solution: Make sure you're viewing `public/data.csv` on GitHub, then look for "Raw" button at the top

---

## 📞 Need Help?

Open an issue in your GitHub repository if you encounter any problems.

---

**Remember to update your CSV file every week to keep the dashboard current!**
