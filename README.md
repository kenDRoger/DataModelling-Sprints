# EIF Fellowship sprint work

Three synthetic-data modelling projects for the Eskwelabs Innovation Fellowship, Data Analytics / Data Modelling track, Cohort 11. Every dataset here is generated teaching data; nothing describes a real retailer, carrier, or network.

## Sprint folders

Each sprint is self-contained and holds the written deliverables, the notebooks, the generated tables, and the reference data the calibration points at.

| Folder | Project | Deliverables |
| --- | --- | --- |
| `Sprint1/` | SD-004 retail demand forecasting | Deliverable 1, 2, 3a, 3b |
| `Sprint2/` | SD-029 last-mile delivery performance | Deliverable 1, 2, 3a, 3b |
| `Sprint3/` | SD-210 network rollout and QoE prioritisation | Deliverable 1, 2, 3a, 3b |

Notebooks run from their own `Notebook1/` or `Notebook2/` directory and read `../data`. Package versions are pinned in each sprint's `requirements.txt` (CPython 3.12.15, pandas 3.1.1, NumPy 2.5.5, Matplotlib 3.11.2, Jupyter Notebook 7.6.5).

## Portfolio site

`portfolio-site/` is a static Vite build of the audience-facing portfolio, configured for the separate `DataModelling-Sprints` GitHub Pages repository. It has not been pushed or deployed; see its README for the build and publishing steps.

## Working files

Helper scripts, tests, archived analysis outputs, and superseded data copies live under `legacy/`, which is excluded from version control. They exist to reproduce and check the handed-in artifacts, not to accompany them.
