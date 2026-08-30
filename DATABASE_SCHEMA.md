# ComponentOS — Database Schema Specification

## 1. Overview
The database uses PostgreSQL with Prisma ORM to store users, role-based permissions, full component registry catalog metadata, semantic versions, dependencies, usage analytics, collections, favorites, and audit logs.

## 2. Prisma Schema Definition

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  AUTHOR
  MAINTAINER
  ADMIN
}

enum ComponentStatus {
  DRAFT
  REVIEW
  PUBLISHED
  DEPRECATED
  ARCHIVED
}

enum ComponentType {
  FOUNDATION
  MICRO
  FORM
  NAVIGATION
  FEEDBACK
  DATA_DISPLAY
  MEDIA
  ADVANCED
  ECOMMERCE
  DASHBOARD
  AUTH
  AI
  BLOCK
  SECTION
  TEMPLATE
  THEME
}

model User {
  id            String         @id @default(cuid())
  name          String?
  email         String         @unique
  emailVerified DateTime?
  image         String?
  role          Role           @default(USER)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  components    Component[]    @relation("AuthorComponents")
  favorites     Favorite[]
  collections   Collection[]
  auditLogs     AuditLog[]
  installations Installation[]
}

model Category {
  id          String      @id @default(cuid())
  slug        String      @unique
  name        String
  description String?
  icon        String?
  order       Int         @default(0)
  components  Component[]
  createdAt   DateTime    @default(now())
}

model Component {
  id          String          @id @default(cuid())
  slug        String          @unique
  name        String
  title       String
  description String
  type        ComponentType   @default(MICRO)
  status      ComponentStatus @default(PUBLISHED)
  qualityScore Float          @default(5.0)
  isOfficial  Boolean         @default(true)
  license     String          @default("MIT")

  authorId    String
  author      User            @relation("AuthorComponents", fields: [authorId], references: [id])

  categoryId  String
  category    Category        @relation(fields: [categoryId], references: [id])

  versions    ComponentVersion[]
  tags        TagOnComponent[]
  favorites   Favorite[]
  collectionItems CollectionItem[]
  installations Installation[]

  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  @@index([slug])
  @@index([type])
  @@index([status])
}

model ComponentVersion {
  id            String          @id @default(cuid())
  version       String          // e.g. "1.0.0"
  changelog     String?
  isLatest      Boolean         @default(true)

  componentId   String
  component     Component       @relation(fields: [componentId], references: [id], onDelete: Cascade)

  files         ComponentFile[]
  dependencies  Dependency[]    @relation("VersionDependencies")
  regDeps       ComponentVersion[] @relation("RegistryDependencies")
  regDepOf      ComponentVersion[] @relation("RegistryDependencies")

  createdAt     DateTime        @default(now())

  @@unique([componentId, version])
}

model ComponentFile {
  id          String           @id @default(cuid())
  path        String           // e.g. "components/ui/button.tsx"
  target      String           // Destination path in user project
  content     String           @db.Text
  type        String           @default("registry:ui")

  versionId   String
  version     ComponentVersion @relation(fields: [versionId], references: [id], onDelete: Cascade)
}

model Dependency {
  id          String           @id @default(cuid())
  name        String           // npm package name e.g. "lucide-react"
  versionReq  String           @default("latest") // semver range
  isPeer      Boolean          @default(false)

  versions    ComponentVersion[] @relation("VersionDependencies")
}

model Tag {
  id         String           @id @default(cuid())
  name       String           @unique
  components TagOnComponent[]
}

model TagOnComponent {
  componentId String
  tagId       String
  component   Component @relation(fields: [componentId], references: [id], onDelete: Cascade)
  tag         Tag       @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([componentId, tagId])
}

model Favorite {
  userId      String
  componentId String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  component   Component @relation(fields: [componentId], references: [id], onDelete: Cascade)
  createdAt   DateTime  @default(now())

  @@id([userId, componentId])
}

model Collection {
  id          String           @id @default(cuid())
  name        String
  description String?
  userId      String
  user        User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  items       CollectionItem[]
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
}

model CollectionItem {
  collectionId String
  componentId  String
  collection   Collection @relation(fields: [collectionId], references: [id], onDelete: Cascade)
  component    Component  @relation(fields: [componentId], references: [id], onDelete: Cascade)

  @@id([collectionId, componentId])
}

model Installation {
  id          String    @id @default(cuid())
  componentId String
  component   Component @relation(fields: [componentId], references: [id], onDelete: Cascade)
  userId      String?
  user        User?     @relation(fields: [userId], references: [id])
  framework   String?   // e.g. "Next.js (App Router)"
  cliVersion  String?
  createdAt   DateTime  @default(now())
}

model AuditLog {
  id        String   @id @default(cuid())
  action    String   // e.g. "COMPONENT_PUBLISHED"
  details   String   @db.Text
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```
