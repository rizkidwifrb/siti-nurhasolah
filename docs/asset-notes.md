# Asset notes

The public site uses only one downloaded portrait asset from the Canva presentation supplied for this project:

- `frontend/src/assets/images/siti-nurhasolah-portrait.webp`

It is a local WebP conversion of the portrait visible in the Canva source. No Canva URLs are used in the published app.

The verified project "Panggung Sekolah Bukan Tempat Luka" is represented with an original CSS/video treatment rather than stock imagery. The project page embeds the YouTube video provided by the requester and links to the related local coverage.

Instagram search surfaced public references to `@nrhashol`, but the public image pages could not be fetched reliably. No Instagram image is hotlinked or copied into the codebase.


## Certificate image updates (October 2026)

Six new certificate images are bundled as optimized WebP assets in `frontend/src/assets/images/certificates/` and registered in `frontend/src/data/portfolioData.js`: Ta’aruf & Wawasan Kebangsaan, Journalism Class, Sosialisasi Empat Pilar MPR RI, English Proficiency Test (EPT), LEAD.co.id Field Reporter Internship, and KPID DKI Jakarta Internship.

The supplied HIMA KPI Member 2024–2025, Daura Makhariijul Huruf & Talaqqi Bersanad, and UPGRADING 2023 photos matched existing assets and records, so the project reuses those files instead of creating duplicates. Certificate thumbnails use `object-contain` so the image does not crop document edges. The public certificate loader also merges the six new portfolio records into older API responses by normalized title, so they remain visible while the backend list is outdated; this frontend-only merge does not write records into the server database.
