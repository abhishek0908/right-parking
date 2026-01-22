-- Supabase SQL Schema for Right Parking Projects
-- Run this in your Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Basic Info
    name VARCHAR(255) NOT NULL,
    description TEXT,
    project_date DATE,
    total_parking_spots INTEGER,
    
    -- Location
    location VARCHAR(255),
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    gmap_link TEXT,
    
    -- Technology
    technology_description TEXT,
    
    -- Media (stored as URLs)
    main_image TEXT,
    photos TEXT[], -- Array of photo URLs
    videos TEXT[], -- Array of video URLs
    documents JSONB, -- Array of {name, url} objects
    
    -- Features (stored as array)
    features TEXT[]
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_name ON projects(name);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to read projects (public access)
CREATE POLICY "Projects are viewable by everyone" ON projects
    FOR SELECT USING (true);

-- Allow authenticated users to insert projects
CREATE POLICY "Authenticated users can insert projects" ON projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update projects
CREATE POLICY "Authenticated users can update projects" ON projects
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete projects
CREATE POLICY "Authenticated users can delete projects" ON projects
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create storage bucket for project files (run this separately in Storage section)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-files', 'project-files', true);

-- Storage policies (run in SQL after creating the bucket)
-- Allow public access to view files
-- CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'project-files');

-- Allow authenticated users to upload files
-- CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-files' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete files
-- CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE USING (bucket_id = 'project-files' AND auth.role() = 'authenticated');
