# Translation Audit 2.0 – Version 7.2.0

## Scope

- Existing legacy language packs
- Complete v7.1 sidebar organization
- AI Producer and Producer Knowledge Base
- Style Health Check
- Style Simplifier
- AI Variation Engine
- AI Conflict Resolver
- Studio Intelligence
- Dynamically generated sidebar groups, recent tools and module clones
- Language-change reapplication through MutationObserver

## Supported languages

| Language | Legacy pack | Groups | Common controls | Module labels | Intelligent headings |
|---|---:|---:|---:|---:|---:|
| en | Yes | 14 | 20 | 12 | 36 |
| de | Yes | 14 | 20 | 12 | 36 |
| fr | Yes | 14 | 20 | 12 | 36 |
| es | Yes | 14 | 20 | 12 | 36 |
| it | Yes | 14 | 20 | 12 | 36 |
| pt | Yes | 14 | 20 | 12 | 36 |
| pt-BR | Yes | 14 | 20 | 12 | 36 |
| nl | Yes | 14 | 20 | 12 | 36 |
| pl | Yes | 14 | 20 | 12 | 36 |
| tr | Yes | 14 | 20 | 12 | 36 |
| ru | Yes | 14 | 20 | 12 | 36 |
| ja | Yes | 14 | 20 | 12 | 36 |
| ko | Yes | 14 | 20 | 12 | 36 |
| zh-CN | Yes | 14 | 20 | 12 | 36 |

## Validation result

All 14 shipped language packs are present. The Translation Overlay 2.0 covers the complete reorganized sidebar and every newly introduced intelligent module from versions 6.1 through 7.1. Existing legacy interfaces continue to use their original full language packs. Dynamic interface elements are translated again after DOM updates and language changes.

## Fallback behavior

If a future module introduces a text key that is not yet registered, English remains the explicit fallback instead of displaying a broken key.