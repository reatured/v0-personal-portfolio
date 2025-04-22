---
title: DOLLARS Chat Application
description: A real-time chat application built with Next.js, React, Tailwind CSS, and Supabase.
imageUrl: https://github.com/reatured/public-assets/blob/main/Web%20Design/DOLLAR%20Chat%20Room/Dollar-chat-room.png?raw=true
imageRatio: landscape
software: Next.js, React, Tailwind CSS, Supabase
---

# DOLLARS Chat Application

## Overview
A modern, real-time messaging platform inspired by the anime "Durarara!!" featuring instant messaging, user authentication, and a responsive interface.

## Technology Stack
- **Frontend**: React with Next.js
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Deployment**: Vercel

## Key Features

### User Authentication
- Email/password and OAuth login
- Secure session management
- Password recovery

### Real-time Messaging
- Instant message delivery
- Message status indicators
- Typing indicators
- Message history with infinite scrolling

### User Experience
- Responsive design for all devices
- Dark/light mode themes
- Customizable user profiles
- Notification system

### Security
- End-to-end encryption
- XSS protection
- Rate limiting
- Input sanitization

## Architecture
- Component-based UI
- Next.js server components
- API routes
- Real-time database
- Edge functions

## Database Schema
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

## Performance Optimization
- Code splitting
- Image optimization
- Memoization
- Virtualized lists
- Incremental Static Regeneration

## Future Enhancements
- Voice/video calls
- File sharing
- End-to-end encryption for all messages
- Custom emoji system
- Advanced search
