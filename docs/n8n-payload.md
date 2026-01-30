# n8n payload voor /api/posts

Gebruik deze payload in een n8n HTTP Request node om een artikel te maken of bij te werken.
De slug wordt automatisch genormaliseerd, en createdAt/updatedAt worden server-side gezet.

## Endpoint

POST /api/posts

## Voorbeeld payload

```json
{
  "title": "Nieuwe dashboards voor realtime inzichten",
  "excerpt": "Van data naar actie in minuten, zonder handmatige stappen.",
  "content": "## Overzicht\nDeze post laat zien hoe je live data omzet in publicaties.\n\n## Stappenplan\n- Valideer de data\n- Update de content\n- Publiceer met n8n\n",
  "category": "Data Dashboards",
  "tags": ["dashboards", "realtime", "workflow"],
  "coverImage": "/images/posts/dashboard.svg",
  "author": {
    "name": "Sophie van Dijk",
    "role": "Head of Analytics",
    "avatar": "/avatars/sophie.svg"
  },
  "liveUpdate": true
}
```

## Response

- 201 met nieuwe post
- 200 met bijgewerkte post
- 400 bij validatie fouten

## GET endpoint

Gebruik GET /api/posts om alle posts op te halen voor dashboards of webhook triggers.
