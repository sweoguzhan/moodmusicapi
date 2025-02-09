# MoodSync - Mood Based Music Recommendation API

MoodSync is a REST API project that provides music recommendations based on users' moods and supports social interaction through a friend system.

## 🚀 Features

- 🎵 AI-powered music recommendations (Google Gemini AI)
- 👥 Friend system with unique friend codes
- 🔐 JWT-based authentication
- 🎧 YouTube Music, Spotify, and Apple Music integrations
- 👤 User profile management

## 🛠️ Technologies

- Node.js & Express.js
- TypeScript
- MongoDB & Mongoose
- Google Gemini AI API
- JWT Authentication
- YouTube Data API
- Bcrypt (Encryption)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/sweoguzhan/moodsync-api.git
```

2. Install dependencies:
```bash
cd moodsync-api
npm install
```

3. Create `.env` file and add required variables:
```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

4. Start the project:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📚 API Endpoints

### User Operations
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - View user profile

### Music Recommendations
- `POST /api/music/recommendations` - Get music recommendations based on mood

### Friend Operations
- `POST /api/friends/add` - Add friend
- `GET /api/friends` - Get friends list
- `DELETE /api/friends/:friendId` - Remove friend

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the [MIT](LICENSE) License.

## 📧 Contact

Project Link: [https://github.com/sweoguzhan/moodsync-api](https://github.com/sweoguzhan/moodsync-api)
