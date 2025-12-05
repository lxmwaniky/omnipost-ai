# OmniPost AI 🚀

**Stop Hiring Marketing Teams.** Instantly generate high-converting videos, images, and captions for X, LinkedIn, Instagram, and more.

OmniPost AI is a powerful social media content generator powered by Google's Gemini 3 Pro. It helps creators and businesses streamline their content creation process by generating platform-specific posts, refining prompts, and creating visual concepts from a single idea.

## ✨ Features

- **🤖 AI-Powered Generation:** Utilizes Google Gemini 3 Pro for high-quality text and creative direction.
- **📱 Multi-Platform Support:** Tailored content for LinkedIn, X (Twitter), Instagram, Facebook, Pinterest, and Video Reels.
- **✨ Smart Prompt Refinement:** "Magic" input feature that transforms basic ideas into detailed, engaging prompts.
- **🎨 Visual Intelligence:** Upload images to guide the AI's generation, ensuring context-aware captions and creative direction.
- **⚙️ Customization:** Control tone (Professional, Witty, Urgent, etc.), image sizes, and aspect ratios.
- **⚡ Modern UI:** Built with React 19 and Framer Motion for a smooth, responsive experience.

## 🛠️ Tech Stack

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **AI Model:** [Google Gemini API](https://ai.google.dev/) (@google/genai)
- **Backend/Auth:** [Supabase](https://supabase.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API Key
- A Supabase project (optional, for auth/database features)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/lxmwaniky/omnipost-ai.git
    cd omnipost-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add the following keys:

    ```env
    # Google Gemini API Key (Required)
    GEMINI_API_KEY=your_gemini_api_key_here

    # Supabase Configuration (Required for Auth/DB)
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open your browser:**
    Navigate to `http://localhost:3000` to view the app.

## 📂 Project Structure

```
omnipost-ai/
├── components/         # Reusable UI components (GenerationForm, PlatformCard, etc.)
├── lib/               # Library configurations (Supabase client)
├── pages/             # Application pages (LandingPage, Dashboard)
├── services/          # API services (geminiService.ts)
├── App.tsx            # Main application component
├── types.ts           # TypeScript definitions
└── vite.config.ts     # Vite configuration
```

## 💡 Usage

1.  **Enter your idea:** Type a topic or concept into the magic input field.
2.  **Refine (Optional):** Click the wand icon to let AI improve your prompt.
3.  **Upload Context (Optional):** Attach an image to give the AI visual context.
4.  **Configure:** Select your target platforms, desired tone, and image settings.
5.  **Generate:** Click "Generate" and watch OmniPost create tailored content for each platform.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
