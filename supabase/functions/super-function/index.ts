import { serve } from "https://deno.land/std/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const {
            full_name,
            email,
            enquiry_type,
            project_details,
        } = await req.json();

        // basic validation
        if (!email || !project_details) {
            return new Response(
                JSON.stringify({ error: "email and project_details are required" }),
                { status: 400, headers: corsHeaders }
            );
        }

        const brevoRes = await fetch(
            "https://api.brevo.com/v3/smtp/email",
            {
                method: "POST",
                headers: {
                    "api-key": Deno.env.get("BREVO_API_KEY")!,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: {
                        email: Deno.env.get("FROM_EMAIL"),
                        name: "Website Contact Form",
                    },
                    to: [
                        {
                            email: Deno.env.get("CONTACT_TO_EMAIL"),
                        },
                    ],
                    subject: `New Enquiry: ${enquiry_type || "General"}`,
                    htmlContent: `
            <h3>New Contact Form Submission</h3>
            <p><b>Full Name:</b> ${full_name || "-"}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Enquiry Type:</b> ${enquiry_type || "-"}</p>
            <p><b>Project Details:</b></p>
            <p>${project_details}</p>
          `,
                }),
            }
        );

        if (!brevoRes.ok) {
            const err = await brevoRes.text();
            return new Response(
                JSON.stringify({ error: "Brevo failed", details: err }),
                { status: 500, headers: corsHeaders }
            );
        }

        return new Response(
            JSON.stringify({ success: true }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ error: "Unexpected error" }),
            { status: 500, headers: corsHeaders }
        );
    }
});
