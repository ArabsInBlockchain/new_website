## What type of change is this?

- [ ] New contributor profile (adding myself to the website)
- [ ] Update my existing profile (photo, links, bio)
- [ ] New or updated event
- [ ] Code / bug fix / feature

---

## For contributor profiles

### Your slug
The unique ID used in file names and URLs. Use lowercase, hyphens only, no spaces.
Example: `sarah-ahmed`, `omar-hassan`

**My slug:** `your-slug-here`

### Files changed

**New profile — create both files:**

`content/contributors/your-slug.json`
```json
{
  "photo": "https://res.cloudinary.com/...",
  "twitter": "your_twitter_handle",
  "linkedin": "your-linkedin-id",
  "github": "your-github-username"
}
```
> Leave any field as `""` if you don't have it.
> For photo: upload to [Cloudinary](https://cloudinary.com) (free) and paste the URL, or leave `""` and we'll use a default avatar.

`messages/ar.json` — add under `"contributors"`:
```json
"your-slug": {
  "name": "اسمك بالعربية",
  "title": "مسمى وظيفي أو دور (اختياري)",
  "bio": "نبذة قصيرة عنك بالعربية (اختياري)"
}
```

`messages/en.json` — add under `"contributors"`:
```json
"your-slug": {
  "name": "Your Name in English",
  "title": "Your title or role (optional)",
  "bio": "Short bio in English (optional)"
}
```

**Updating an existing profile — just edit the relevant files.**

---

## For events

If you're adding or updating an event, edit:
- `content/events/event-slug.json` — date, type, status, banner, speakers, contributors
- `messages/ar.json` under `"events"` — Arabic title, description, location
- `messages/en.json` under `"events"` — English title, description, location

---

## Checklist

- [ ] My slug is lowercase with hyphens only (e.g. `sara-ahmed`, not `Sara Ahmed`)
- [ ] Both `messages/ar.json` and `messages/en.json` are updated
- [ ] Photo URL is a Cloudinary link (or left empty)
- [ ] No hardcoded Arabic/English text in `.tsx` files
- [ ] `npm run build` passes locally (or I've noted why I couldn't run it)

---

## Anything else?

Tell us anything that would help reviewers — context about your role, event you contributed to, or anything unclear in these instructions.
