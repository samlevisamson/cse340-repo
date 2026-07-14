-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE public.service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES public.organization(organization_id)
        ON DELETE CASCADE
);

INSERT INTO public.service_project
(organization_id, title, description, location, project_date)
VALUES
(1, 'Community Playground Build',
 'Construct a safe playground for neighborhood children.',
 'Coimbatore', '2026-08-15'),

(1, 'School Renovation',
 'Renovate classrooms and repaint school buildings.',
 'Madurai', '2026-09-10'),

(1, 'Park Bench Installation',
 'Install benches in public parks.',
 'Salem', '2026-10-05'),

(1, 'Library Expansion',
 'Build additional reading spaces in the community library.',
 'Erode', '2026-11-18'),

(1, 'Senior Home Repairs',
 'Repair roofs and electrical systems in a senior care home.',
 'Tiruppur', '2026-12-06');

 INSERT INTO public.service_project
(organization_id, title, description, location, project_date)
VALUES
(2, 'Community Garden',
 'Create a neighborhood vegetable garden.',
 'Coimbatore', '2026-08-20'),

(2, 'Tree Planting Drive',
 'Plant native trees in public parks.',
 'Pollachi', '2026-09-12'),

(2, 'School Garden Project',
 'Teach students sustainable gardening.',
 'Mettupalayam', '2026-10-08'),

(2, 'Urban Farming Workshop',
 'Conduct workshops on urban agriculture.',
 'Coimbatore', '2026-11-15'),

(2, 'Organic Compost Program',
 'Launch a compost collection initiative.',
 'Tiruppur', '2026-12-12');

 INSERT INTO public.service_project
(organization_id, title, description, location, project_date)
VALUES
(3, 'Food Distribution',
 'Distribute food packages to families in need.',
 'Coimbatore', '2026-08-18'),

(3, 'Blood Donation Camp',
 'Organize a community blood donation drive.',
 'Erode', '2026-09-22'),

(3, 'Beach Cleanup',
 'Volunteer cleanup of public beaches.',
 'Chennai', '2026-10-11'),

(3, 'Senior Citizen Visit',
 'Visit and assist residents at senior homes.',
 'Salem', '2026-11-21'),

(3, 'Winter Clothing Drive',
 'Collect and distribute warm clothing.',
 'Madurai', '2026-12-14');

 CREATE TABLE public.project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES public.service_project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES public.category(category_id)
        ON DELETE CASCADE
);

/*=====================================================
  CATEGORY TABLE
=====================================================*/

CREATE TABLE public.category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

/*=====================================================
  PROJECT_CATEGORY JUNCTION TABLE
=====================================================*/

CREATE TABLE public.project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES public.service_project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES public.category(category_id)
        ON DELETE CASCADE
);

/*=====================================================
  INSERT CATEGORIES
=====================================================*/

INSERT INTO public.category (name)
VALUES
('Education'),
('Environment'),
('Community Service');

/*=====================================================
  ASSOCIATE PROJECTS WITH CATEGORIES
=====================================================*/

INSERT INTO public.project_category (project_id, category_id)
VALUES
(1,3),  -- Community Playground Build
(2,1),  -- School Renovation
(3,3),  -- Park Bench Installation
(4,1),  -- Library Expansion
(5,3),  -- Senior Home Repairs
(6,2),  -- Community Garden
(7,2),  -- Tree Planting Drive
(8,1),  -- School Garden Project
(9,2),  -- Urban Farming Workshop
(10,2), -- Organic Compost Program
(11,3), -- Food Distribution
(12,3); -- Blood Donation Camp