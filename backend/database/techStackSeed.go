package database

import (
	"errors"
	"github.com/premo14/personal-website/backend/models"
	"gorm.io/datatypes"
	"gorm.io/gorm"
	"log"
)

func SeedTechStack() error {
	var techStack models.TechStack
	result := DB.First(&techStack)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			log.Println("Seeding initial Tech Stack...")

			initial := models.TechStack{
				Tools: datatypes.JSON(`[
				  {
					"name": "Go",
					"link": "https://go.dev/",
					"icon": "/logos/go.svg",
					"categories": ["Backend"]
				  },
				  {
					"name": "JavaScript",
					"link": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
					"icon": "/logos/javascript.svg",
					"categories": ["Frontend", "Backend"]
				  },
				  {
					"name": "TypeScript",
					"link": "https://www.typescriptlang.org/",
					"icon": "/logos/typescript.svg",
					"categories": ["Frontend"]
				  },
				  {
					"name": "Node.js",
					"link": "https://nodejs.org/",
					"icon": "/logos/nodedotjs.svg",
					"categories": ["Backend"]
				  },
				  {
					"name": "Express",
					"link": "https://expressjs.com/",
					"icon": "/logos/express.svg",
					"categories": ["Backend"]
				  },
				  {
					"name": "React",
					"link": "https://reactjs.org/",
					"icon": "/logos/react.svg",
					"categories": ["Frontend"]
				  },
				  {
					"name": "React Native",
					"link": "https://reactnative.dev/",
					"icon": "/logos/react.svg",
					"categories": ["Frontend"]
				  },
				  {
					"name": "TailwindCSS",
					"link": "https://tailwindcss.com/",
					"icon": "/logos/tailwindcss.svg",
					"categories": ["Frontend"]
				  },
				  {
					"name": "Vite",
					"link": "https://vitejs.dev/",
					"icon": "/logos/vite.svg",
					"categories": ["Frontend"]
				  },
				  {
					"name": "Docker",
					"link": "https://www.docker.com/",
					"icon": "/logos/docker.svg",
					"categories": ["DevOps"]
				  },
				  {
					"name": "GitHub Actions",
					"link": "https://github.com/features/actions",
					"icon": "/logos/githubactions.svg",
					"categories": ["DevOps"]
				  },
				  {
					"name": "Terraform",
					"link": "https://www.terraform.io/",
					"icon": "/logos/terraform.svg",
					"categories": ["DevOps", "Cloud"]
				  },
				  {
					"name": "NGINX",
					"link": "https://nginx.org/",
					"icon": "/logos/nginx.svg",
					"categories": ["DevOps"]
				  },
				  {
					"name": "AWS EC2",
					"link": "https://aws.amazon.com/ec2/",
					"icon": "/logos/amazonec2.svg",
					"categories": ["Cloud"]
				  },
				  {
					"name": "AWS ECR",
					"link": "https://aws.amazon.com/ecr/",
					"icon": "/logos/amazonecs.svg",
					"categories": ["Cloud"]
				  },
				  {
					"name": "AWS Route 53",
					"link": "https://aws.amazon.com/route53/",
					"icon": "/logos/amazonroute53.svg",
					"categories": ["Cloud"]
				  },
				  {
					"name": "AWS S3",
					"link": "https://aws.amazon.com/s3/",
					"icon": "/logos/amazons3.svg",
					"categories": ["Cloud"]
				  },
				  {
					"name": "AWS RDS",
					"link": "https://aws.amazon.com/rds/",
					"icon": "/logos/amazonrds.svg",
					"categories": ["Cloud", "Databases"]
				  },
				  {
					"name": "MySQL",
					"link": "https://www.mysql.com/",
					"icon": "/logos/mysql.svg",
					"categories": ["Databases"]
				  },
				  {
					"name": "PostgreSQL",
					"link": "https://www.postgresql.org/",
					"icon": "/logos/postgresql.svg",
					"categories": ["Databases"]
				  },
				  {
					"name": "MariaDB",
					"link": "https://mariadb.org/",
					"icon": "/logos/mariadb.svg",
					"categories": ["Databases"]
				  },
				  {
					"name": "MongoDB",
					"link": "https://www.mongodb.com/",
					"icon": "/logos/mongodb.svg",
					"categories": ["Databases"]
				  },
				  {
					"name": "ESLint",
					"link": "https://eslint.org/",
					"icon": "/logos/eslint.svg",
					"categories": ["Utilities"]
				  },
				  {
					"name": "GitHub",
					"link": "https://github.com/",
					"icon": "/logos/github.svg",
					"categories": ["Utilities"]
				  },
				  {
					"name": "Shell Scripting",
					"link": "https://en.wikipedia.org/wiki/Shell_script",
					"icon": "/logos/gnubash.svg",
					"categories": ["Utilities"]
				  },
				  {
					"name": "JetBrains",
					"link": "https://www.jetbrains.com/",
					"icon": "/logos/jetbrains.svg",
					"categories": ["Utilities"]
				  },
				  {
					"name": "Linux",
					"link": "https://www.kernel.org/",
					"icon": "/logos/linux.svg",
					"categories": ["Utilities"]
				  },
				  {
					"name": "Postman",
					"link": "https://www.postman.com/",
					"icon": "/logos/postman.svg",
					"categories": ["Utilities"]
				  }
				]
				`)}

			if err := DB.Create(&initial).Error; err != nil {
				return err
			}

			log.Println("✅ Tech Stack seeded successfully!")
			return nil
		}
		return result.Error
	}
	log.Println("⚡ Resume already exists, skipping seeding.")
	return nil
}
