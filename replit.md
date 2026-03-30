# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── algeria2malaysia/   # Algeria2Malaysia website (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Algeria2Malaysia Website

A smart sales funnel website for the Algeria2Malaysia education agency.

### Features
- Full Arabic RTL homepage with hero, why Malaysia, services, institutes, CTA
- Smart multi-step application funnel for English institutes
- Goal selection (IELTS / General English / University Pathway)
- Budget-based institute recommendation (Stratford, Big Ben, Erican)
- Accommodation selector (Studio, Master Room, Medium Room, Small Room)
- Intake month selector
- University application flow (separate simpler flow)
- Google Forms integration (links in `src/data/institutes.ts`)
- WhatsApp redirect with pre-filled message
- Thank you page after submission

### Key Files
- `artifacts/algeria2malaysia/src/data/institutes.ts` — All institute data, pricing, Google Form links, WhatsApp number
- `artifacts/algeria2malaysia/src/pages/HomePage.tsx` — Landing page
- `artifacts/algeria2malaysia/src/pages/ApplyPage.tsx` — Multi-step funnel
- `artifacts/algeria2malaysia/src/pages/ThankYouPage.tsx` — Success page
- `artifacts/algeria2malaysia/src/hooks/useNavigate.ts` — Simple SPA navigation store

### To Update Google Form Links
Edit `GOOGLE_FORM_LINKS` in `src/data/institutes.ts`:
```ts
export const GOOGLE_FORM_LINKS = {
  institute: "https://docs.google.com/forms/d/e/YOUR_REAL_ID/viewform",
  university: "https://docs.google.com/forms/d/e/YOUR_REAL_ID/viewform",
};
```

### WhatsApp Number
`+601112200603` — defined in `WHATSAPP_NUMBER` constant in `src/data/institutes.ts`

### Branding
- Colors: Green (#166534) and White
- Font: Cairo (Arabic) + Tajawal
- Direction: RTL (Arabic)
- Logo: `/public/logo.jpeg`
