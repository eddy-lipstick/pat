# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Preventive Law Platform** project - a collaboration between Patroon Labs and Hogeschool Zuyd Sittard. The project aims to create an AI-driven platform that identifies and presents preventive law elements from Dutch legal cases (rechtspraak).

**Key concept**: Extract concrete examples from Dutch court decisions showing "what went wrong" and "how it could have been prevented" to make preventive law more accessible to students and legal practitioners.

## Project Status

**Current Phase**: Static prototype/mockup phase
- Single HTML file (`index.html`) containing the complete static website
- Project planning document (`plan.md`) with detailed technical specifications
- No build tools, dependencies, or development workflow yet established

## Architecture Overview

### Current Structure
- **Static HTML/CSS**: Single-file website with embedded styles
- **Dutch Language**: All content and UI text in Dutch (nl)
- **Responsive Design**: Mobile-first approach with CSS Grid layout
- **Case Categories**: Four main types - Communicatie, Contractueel, Processueel, Due Diligence

### Planned Technical Stack (from plan.md)
- **Frontend**: React with TypeScript
- **AI Analysis**: OpenAI or Anthropic for legal case analysis  
- **Data Source**: ECLI (European Case Law Identifier) API for Dutch court decisions
- **Database**: European servers for case storage and analysis
- **RAG System**: Vector database integration with Zuyd's preventive law literature
- **Privacy**: GDPR-compliant, European hosting, no personal data processing

## Key Features (Planned)

### Core Functionality
1. **AI Case Analysis**: Automatic identification of preventive law elements in court decisions
2. **Case Presentation**: 
   - "Wat ging er mis?" (What went wrong?)
   - "Hoe het voorkomen kon worden" (How it could have been prevented)  
   - ECLI identifiers for legal reference
3. **Categorization**: Automatic sorting into four main categories
4. **Search & Filter**: By category, ECLI number, legal domain
5. **Educational Tools**: Integration with Zuyd study materials via RAG

### Data Privacy Requirements
- **No personal data**: Only published court decisions via ECLI
- **GDPR compliance**: European servers, data minimization
- **Transparency**: Clear user information about data usage
- **User control**: Opt-in for non-essential features

## Development Workflow

### When Building This Project

1. **Technology Migration**: Convert from static HTML to React/TypeScript
2. **API Integration**: Implement ECLI API connection for case retrieval
3. **AI Pipeline**: Develop prompts and processing for preventive law element identification
4. **Database Design**: Structure for cases, analyses, and Zuyd literature
5. **RAG Implementation**: Vector embeddings for Zuyd's academic content

### No Current Build Commands
This is currently a static prototype with no package.json or build tools. Future development will require:
- `npm create react-app` or similar setup
- TypeScript configuration
- AI API integration setup
- Database connection configuration

## Content Structure

### Case Card Format
Each legal case displays:
- **ECLI identifier**: European legal reference (e.g., ECLI:NL:RBAMS:2024:1847)
- **Category badge**: Visual classification of preventive law type
- **Problem description**: What legal issue occurred
- **Prevention advice**: How the issue could have been avoided
- **Zuyd academic context**: (planned) Scientific backing from university research

### Categories
1. **Communicatie**: Miscommunication-related legal issues
2. **Contractueel**: Contract drafting and interpretation problems  
3. **Processueel**: Procedural legal errors
4. **Due Diligence**: Issues from inadequate pre-transaction research

## Brand Guidelines

- **Colors**: Zuyd red (#e31e24) for branding, blue gradient for hero sections
- **Typography**: System fonts, clean and professional
- **Language**: Professional Dutch legal terminology
- **Tone**: Educational and practical, focused on prevention rather than litigation

## Development Considerations

### Legal Requirements
- Respect copyright of Zuyd academic materials
- Ensure proper attribution for ECLI case references
- Maintain privacy compliance throughout development
- No storage or processing of personal data from legal cases

### Performance Requirements (from plan.md)
- **AI Accuracy**: Minimum 80% correct identification of preventive law elements
- **Load Times**: Under 3 seconds for case overviews
- **Privacy Compliance**: 100% GDPR conformant
- **Educational Value**: Measurable learning outcomes via Zuyd evaluations

## Future Development Phases

1. **Foundation (Months 1-3)**: ECLI API integration, AI prompt development
2. **Core Features (Months 4-6)**: Full AI analysis pipeline, RAG system
3. **Advanced Features (Months 7-9)**: Advanced search, user analysis tools
4. **Launch & Growth (Months 10-12)**: Public launch, user feedback integration

This project represents a novel approach to legal education, combining AI technology with academic expertise to make preventive law principles more accessible and actionable.