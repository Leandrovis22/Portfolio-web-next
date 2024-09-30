-- CreateTable
CREATE TABLE "AboutData" (
    "id" SERIAL NOT NULL,
    "CVpdf" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AboutData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillsData" (
    "id" SERIAL NOT NULL,
    "words" TEXT[],

    CONSTRAINT "SkillsData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "skillsDataId" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificationsData" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "CertificationsData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "certificationsDataId" INTEGER NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectsData" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "ProjectsData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "externalLink" TEXT NOT NULL,
    "githubLink" TEXT NOT NULL,
    "projectsDataId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactData" (
    "id" SERIAL NOT NULL,
    "CVpdf" TEXT NOT NULL,
    "githubtext" TEXT NOT NULL,
    "githublink" TEXT NOT NULL,
    "linkedintext" TEXT NOT NULL,
    "linkedinlink" TEXT NOT NULL,
    "emailtext" TEXT NOT NULL,

    CONSTRAINT "ContactData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FooterData" (
    "id" SERIAL NOT NULL,
    "words" TEXT[],

    CONSTRAINT "FooterData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_skillsDataId_fkey" FOREIGN KEY ("skillsDataId") REFERENCES "SkillsData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_certificationsDataId_fkey" FOREIGN KEY ("certificationsDataId") REFERENCES "CertificationsData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_projectsDataId_fkey" FOREIGN KEY ("projectsDataId") REFERENCES "ProjectsData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
