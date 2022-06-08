import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    try {
        if (request.method === "POST") {
            // Submit to Drupal.
            const result = await fetch(
                `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        webform_id: "contact",
                        name: request.body.name,
                        email: request.body.email,
                        message: request.body.message,
                        subject: request.body.subject,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            if (!result.ok) {
                throw new Error()
            }

            response.status(200).end()
        }
    } catch (error) {
        return response.status(400).json(error.message)
    }
}