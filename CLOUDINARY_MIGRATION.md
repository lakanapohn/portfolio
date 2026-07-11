# Cloudinary Migration Inventory

This inventory lists current local image references found in the site. The referenced local `src` values are intentionally preserved as fallbacks. The Cloudinary public IDs below are suggestions only; they do not mean the assets have been uploaded.

Recommended folder organization:

```text
portfolio/
  home/
  about/
  art-work/
  cartographic-design/
  landscape-work/
  msc-work/
  spatial-analysis/
  thesis/
```

| Current local path | Page(s) where used | Current alt text | Better alt text needed? | Image purpose | Recommended Cloudinary folder | Suggested public ID | Recommended treatment | Cropping acceptable? | Migration status |
|---|---|---|---|---|---|---|---|---|---|
| `images/me.jpg` | `about.html` | Portrait of Lakanapohn Sinparu | No | About portrait | `portfolio/about/` | `portfolio/about/portrait` | full image | No | Pending upload and public ID |
| `images/VIENNA_IoT_explode.png` | `contact.html` | Vienna IoT exploded diagram | Maybe, if more project context is available | Contact page visual | `portfolio/contact/` | `portfolio/contact/vienna-iot-exploded-diagram` | full image | No | Pending upload and public ID |
| `images/cartographic/cuba-coral-map.jpg` | `cartographic-design.html` | Cuba coral reef bleaching map | Maybe, if exact map title is available | Cartographic project map | `portfolio/cartographic-design/` | `portfolio/cartographic-design/cuba-coral-reef-bleaching-map` | full image | No | Pending upload and public ID |
| `images/cartographic/brochure.png` | `cartographic-design.html` | Cartographic brochure about coral reef bleaching | Maybe, if brochure title is available | Cartographic project brochure | `portfolio/cartographic-design/` | `portfolio/cartographic-design/coral-reef-bleaching-brochure` | full image | No | Pending upload and public ID |
| `images/final-master plan_edit2024.png` | `thesis.html` initial image, master-plan link, and slide 1 | Master plan | Maybe; could mention thesis site if desired | Thesis master plan | `portfolio/thesis/` | `portfolio/thesis/final-master-plan-edit-2024` | hero image / full image | No | Pending upload and public ID |
| `images/iso plaza zone.png` | `thesis.html` slide 2 | Public and recreation zone - plaza iso plan | No | Thesis slideshow diagram | `portfolio/thesis/` | `portfolio/thesis/iso-plaza-zone` | full image | No | Pending upload and public ID |
| `images/iso-cafe.png` | `thesis.html` slide 3 | Public and recreation zone - cafe | No | Thesis slideshow diagram | `portfolio/thesis/` | `portfolio/thesis/iso-cafe` | full image | No | Pending upload and public ID |
| `images/iso-lc.png` | `thesis.html` slide 4 | Learning center zone | No | Thesis slideshow diagram | `portfolio/thesis/` | `portfolio/thesis/iso-learning-center` | full image | No | Pending upload and public ID |
| `images/iso-community-garden.png` | `thesis.html` slide 5 | Community garden zone | No | Thesis slideshow diagram | `portfolio/thesis/` | `portfolio/thesis/iso-community-garden` | full image | No | Pending upload and public ID |
| `images/iso-integrated-farm.png` | `thesis.html` slide 6 | Community support agriculture zone - integrated farm | No | Thesis slideshow diagram | `portfolio/thesis/` | `portfolio/thesis/iso-integrated-farm` | full image | No | Pending upload and public ID |
| `images/iso-rent.png` | `thesis.html` slide 7 | Productive urban agriculture zone | No | Thesis slideshow diagram | `portfolio/thesis/` | `portfolio/thesis/iso-rent` | full image | No | Pending upload and public ID |
| `images/iso-orchard.png` | `thesis.html` slide 8 | Community support agriculture zone - mixed orchard | No | Thesis slideshow diagram | `portfolio/thesis/` | `portfolio/thesis/iso-orchard` | full image | No | Pending upload and public ID |
| `images/iso-agro.png` | `thesis.html` slide 9 | Community support agriculture zone - agroforestry | No | Thesis slideshow diagram | `portfolio/thesis/` | `portfolio/thesis/iso-agroforestry` | full image | No | Pending upload and public ID |
| `images/iso-resevoir.png` | `thesis.html` slide 10 | Reservoir zone | No | Thesis slideshow diagram | `portfolio/thesis/` | `portfolio/thesis/iso-reservoir` | full image | No | Pending upload and public ID |
| `images/iso-boh.png` | `thesis.html` slide 11 | Back of house zone | No | Thesis slideshow diagram | `portfolio/thesis/` | `portfolio/thesis/iso-back-of-house` | full image | No | Pending upload and public ID |

## CSS background images

No file-backed CSS `background-image: url(...)` references were found during the migration audit. Existing CSS gradients are preserved.

## Notes

- The three missing landscape project pages are intentionally kept linked for now: `coastal-sediment.html`, `urban-planning.html`, and `past-work.html`.
- The current repository checkout does not include a top-level `images/` directory, so local image paths may appear broken until images are supplied locally or Cloudinary public IDs are configured.
- Use `c_limit`, `f_auto`, and `q_auto` for these images. Cropping is not recommended because maps, plans, diagrams, posters, and thesis drawings should remain intact.
