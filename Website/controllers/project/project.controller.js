import { createProject, addProjectEntrepreneur } from "../../models/project/project.model.js";

export const createProjectController = async (req, res, next) => {
    try {
        const {
            name,
            domain,
            short_description,
            problem,
            solution,
            tech_stack,
            stage,
            status,
            github_url,
            demo_url,
            team_type,
            looking_for_cofounders,
            funding_stage,
            co_founders_codes,
        } = req.body;

        if (!name || !domain || !short_description || !problem || !solution || !tech_stack || !team_type) {
            req.flash("error", "All required fields must be filled");
            return res.redirect("/v1/projects/new");
        }

        if (short_description.trim().length > 150) {
            req.flash("error", "Elevator pitch must not exceed 150 characters");
            return res.redirect("/v1/projects/new");
        }

        if (short_description.trim().length < 10) {
            req.flash("error", "Elevator pitch must be at least 10 characters");
            return res.redirect("/v1/projects/new");
        }

        if (name.trim().length < 3) {
            req.flash("error", "Project name must be at least 3 characters");
            return res.redirect("/v1/projects/new");
        }

        if (problem.trim().length < 20) {
            req.flash("error", "Problem description must be at least 20 characters");
            return res.redirect("/v1/projects/new");
        }

        if (solution.trim().length < 20) {
            req.flash("error", "Solution description must be at least 20 characters");
            return res.redirect("/v1/projects/new");
        }

        const validStages = ["idea", "in-progress", "completed"];
        if (stage && !validStages.includes(stage)) {
            req.flash("error", "Invalid development stage selected");
            return res.redirect("/v1/projects/new");
        }

        const validTeamTypes = ["individual", "team", "large-team"];
        if (!validTeamTypes.includes(team_type)) {
            req.flash("error", "Invalid team structure selected");
            return res.redirect("/v1/projects/new");
        }

        const validFundingStages = ["pre-seed", "seed", "bootstrapped"];
        if (funding_stage && funding_stage.trim() && !validFundingStages.includes(funding_stage)) {
            req.flash("error", "Invalid funding stage selected");
            return res.redirect("/v1/projects/new");
        }

        const urlRegex = /^https?:\/\/.+\..+/;
        if (github_url && github_url.trim() && !urlRegex.test(github_url)) {
            req.flash("error", "Invalid GitHub URL format. Must start with http:// or https://");
            return res.redirect("/v1/projects/new");
        }

        if (demo_url && demo_url.trim() && !urlRegex.test(demo_url)) {
            req.flash("error", "Invalid demo URL format. Must start with http:// or https://");
            return res.redirect("/v1/projects/new");
        }

        if ((team_type === 'team' || team_type === 'large-team') && !co_founders_codes) {
            req.flash("error", "Please enter co-founders user codes for team projects");
            return res.redirect("/v1/projects/new");
        }

        let coFounderUserIds = [];
        if (co_founders_codes && co_founders_codes.trim()) {
            const codes = co_founders_codes
                .split(',')
                .map(code => code.trim().toUpperCase())
                .filter(code => code.length > 0);

            const uniqueCodes = [...new Set(codes)];
            if (codes.length !== uniqueCodes.length) {
                req.flash("error", "Duplicate user codes found. Please remove duplicates");
                return res.redirect("/v1/projects/new");
            }

            // for (const code of uniqueCodes) {
            //     const userId = await getUserIdByCode(code);

            //     if (!userId) {
            //         req.flash("error", `User code '${code}' not found. Please verify and try again`);
            //         return res.redirect("/v1/projects/new");
            //     }

            //     if (userId === req.session.userId) {
            //         req.flash("error", "You cannot add yourself as a co-founder");
            //         return res.redirect("/v1/projects/new");
            //     }

            //     coFounderUserIds.push(userId);
            // }

            if (team_type === 'team' && coFounderUserIds.length > 2) {
                req.flash("error", "Core Team allows maximum 2 co-founders");
                return res.redirect("/v1/projects/new");
            }

            if (team_type === 'large-team' && coFounderUserIds.length < 3) {
                req.flash("error", "Scale Team requires at least 3 co-founders");
                return res.redirect("/v1/projects/new");
            }
        }

        const newProject = await createProject({
            name: name.trim(),
            domain: domain.trim(),
            short_description: short_description.trim(),
            problem: problem.trim(),
            solution: solution.trim(),
            tech_stack: tech_stack.trim(),
            stage: stage || "idea",
            status: status || "Pending",
            github_url: github_url?.trim() || null,
            demo_url: demo_url?.trim() || null,
            team_type,
            looking_for_cofounders: Boolean(looking_for_cofounders),
            funding_stage: funding_stage?.trim() || null,
        });

        await addProjectEntrepreneur(newProject.id, req.session.userId, 'founder');

        if (coFounderUserIds.length > 0) {
            for (const userId of coFounderUserIds) {
                await addProjectEntrepreneur(newProject.id, userId, 'co-founder');
            }
        }

        req.flash("success", `Project created successfully! ${coFounderUserIds.length > 0 ? `${coFounderUserIds.length} co-founder(s) added` : ''} 🚀`);
        res.redirect(`/v1/projects`);

    } catch (err) {
        console.error("Error in createProjectController:", err);

        if (err.code === "23505") {
            req.flash("error", "A project with this name already exists");
            return res.redirect("/v1/projects/new");
        }

        if (err.code === "23502") {
            req.flash("error", "Missing required database fields");
            return res.redirect("/v1/projects/new");
        }

        if (err.code === "23503") {
            req.flash("error", "Invalid user code provided");
            return res.redirect("/v1/projects/new");
        }

        req.flash("error", "An error occurred while creating the project. Please try again");
        res.redirect("/v1/projects/new");
    }
};


export const newProjectPage = (req, res) => {
    res.render("projects/add-project", {
        pageRoute: "/v1/projects/new",
        error: req.flash("error")[0] || null,
        success: req.flash("success")[0] || null,
    });
};
