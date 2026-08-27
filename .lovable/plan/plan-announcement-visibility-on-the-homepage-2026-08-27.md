# Plan: Announcement visibility on the homepage

## Goal
Let visitors clearly see when there are new announcements, and add one new announcement card to the existing bulletin board.

## What exists today
- `src/components/home/AnnouncementsBoard.tsx` renders 3 hardcoded announcement cards plus a weekly program schedule.
- The homepage navbar has no indicator pointing users to the announcements section.
- The footer links `#programs` ("Announcements") but there's no "new" signal.

## Changes

### 1. Add a "New" badge system to announcements
- In `AnnouncementsBoard.tsx`, add a `isNew` (or `publishedAt`) flag to each announcement entry.
- Render a small "New" pill badge on announcements flagged as new (e.g., dated within the last ~7 days), using the existing accent token so it matches the design system.
- Add a pulse/dot indicator next to the "Announcements" link in the homepage navbar (desktop + mobile) so visitors can see there's something new. The dot clears once the user scrolls to / clicks into the announcements section (simple `IntersectionObserver` or click-to-dismiss via local state). This is UI-only, no backend.

### 2. Add a new announcement card
- Add a 4th announcement entry to the `announcements` array in `AnnouncementsBoard.tsx`, flagged as new. Proposed realistic content (Taglish, matching existing tone):

  > **Date:** 27 Ago 2026 · **Tag:** Bakunahan
  > **Title:** Libreng Flu Vaccination Drive — Setyembre 5
  > **Body:** Para sa mga senior, pregnant, at may comorbidity. Dalhin ang barangay ID at ECCD card. Sa Main Hall, 8:00 AM – 12:00 NN.

  (Exact wording can be tweaked during build.)

### 3. Optional: "View all announcements" affordance
- If the card list grows, add a small "Tingnan ang lahat ng anunsyo" text link under the list that smooth-scrolls back to the top of the board. Keep it minimal — no new page, no backend.

## Out of scope
- No backend / database storage of announcements (this is a blueprint build; announcements stay hardcoded in the component).
- No admin UI to create announcements.
- No changes to auth, routing, or other pages.

## Files touched
- `src/components/home/AnnouncementsBoard.tsx` — add new card entry + "New" badge rendering.
- `src/pages/Home.tsx` — add "new announcements" indicator dot to the nav "Announcements"/`#programs` link (desktop + mobile menu).

## Verification
- Build/typecheck passes.
- Visual check: the "New" badge shows on recent cards and the nav dot appears, then clears on scroll/click.
