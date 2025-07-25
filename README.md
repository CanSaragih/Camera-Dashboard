# Camera Dashboard

A modern React-based camera monitoring dashboard with real-time statistics and system monitoring.

## Features

- 🔐 User authentication
- 📊 Camera statistics (Total, Active, Inactive)
- 📈 Real-time system monitoring (CPU, Memory, Storage)
- 📱 Responsive design for mobile, tablet, and desktop

## Installation

1. Clone the repository:

```bash
git clone https://github.com/CanSaragih/Camera-Dashboard.git
cd camera-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Copy the example .env file and set the API URL:

```bash
cp .env.example .env
```

4. Then edit .env and make sure it contains:

```bash
VITE_API_URL=https://your-api-url.com
```

##

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

##

### Production Build

```bash
npm run build
npm run preview
```

## Default Login Credentials

- **Username:** `admin`
- **Password:** `password`

##

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── helpers/          # Utility functions
├── layouts/          # Layout components
└── assets/           # Static assets
```

## Technologies Used

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- React Router
- Axios
