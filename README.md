# Personal-Website

test trigger

## Full Tech Stack

### Frontend
- [**React**](https://reactjs.org/) (frontend UI framework)
- [**Vite**](https://vitejs.dev/) (frontend build tool)
- [**Axios**](https://axios-http.com/) (HTTP client for API calls)
- [**Tailwind CSS**](https://tailwindcss.com/) (utility-first CSS framework)
- [**React Router**](https://reactrouter.com/) (client-side routing)
- [**React Query**](https://tanstack.com/query/latest) (server-state management)
- [**react-hook-form**](https://react-hook-form.com/) (form handling)

### Backend
- [**Go**](https://golang.org/) (backend programming language)
- [**Fiber**](https://gofiber.io/) (Go web framework)
- [**GORM**](https://gorm.io/) (ORM library for Go)
- [**PostgreSQL**](https://www.postgresql.org/) (relational database)

### DevOps / Cloud
- [**Docker**](https://www.docker.com/) (containerization platform)
- [**Docker Compose**](https://docs.docker.com/compose/) (multi-container orchestration for local dev)
- [**GitHub Actions**](https://github.com/features/actions) (CI/CD automation)
- [**Terraform**](https://www.terraform.io/) (infrastructure as code tool)

#### AWS
- [**EC2**](https://aws.amazon.com/ec2/) (virtual server hosting)
- [**ECR**](https://aws.amazon.com/ecr/) (Docker image registry)
- [**S3**](https://aws.amazon.com/s3/) (object storage service)
- [**Route 53**](https://aws.amazon.com/route53/) (DNS and domain management)

## Techniques

- **Code Splitting & Lazy Loading**: Implemented lazy-loaded routes using `React Router` and `React.lazy` to reduce initial bundle size.
- **Nested Routing**: Utilized `React Router` to manage hierarchical UI and route structures cleanly.
- **Form Validation with Schema Support**: Used `react-hook-form` with validation libraries (like `Zod` or `Yup`) for performant, accessible forms.
- **API Caching & Background Refetching**: Leveraged `React Query` to handle server state, caching responses and auto-refetching on focus or network reconnection.
- **Optimistic UI Updates**: Enabled snappy UX with `React Query` by applying optimistic updates during mutations.
- **Debounced Search Requests**: Applied debouncing in combination with `React Query` for responsive and efficient search experiences.
- **Custom React Hooks**: Encapsulated repeated logic (e.g. data fetching, form handling) into clean, reusable hooks.
- **Responsive Design with Tailwind CSS**: Used utility-first styling and responsive classes for a mobile-first layout.
- **Docker Multi-Stage Builds**: Built smaller and more secure production images using Docker's multi-stage builds.
- **Infrastructure as Code with Terraform**: Defined and provisioned AWS resources (EC2, S3, Route 53, etc.) via version-controlled Terraform scripts.
- **CI/CD with GitHub Actions**: Set up automated testing, build, and deployment workflows triggered on `push` to `main`.
- **Environment-Specific Configuration**: Managed environment variables and secrets for dev/prod environments using Docker and Terraform best practices.
- **Database Migrations**: Managed schema changes in PostgreSQL via GORM’s auto-migrations or manual scripts.
