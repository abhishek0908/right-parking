-- FIX: Enable Public Access to Projects and Files

-- 1. Policies for 'projects' table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view projects" ON projects;
DROP POLICY IF EXISTS "Projects are viewable by everyone" ON projects;

CREATE POLICY "Public can view projects" 
ON projects FOR SELECT 
USING (true);


-- 2. Policies for 'project_files' table
-- (This table might have been created separately, so we ensure policies exist)
ALTER TABLE IF EXISTS project_files ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view project files" ON project_files;
DROP POLICY IF EXISTS "Project files are viewable by everyone" ON project_files;

CREATE POLICY "Public can view project files" 
ON project_files FOR SELECT 
USING (true);


-- 3. Just in case you are using Supabase Storage and not Cloudinary (though code suggests Cloudinary)
-- If your 'project_files' table stores direct links, the above is enough.
