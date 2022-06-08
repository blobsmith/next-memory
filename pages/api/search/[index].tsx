import { NextApiRequest, NextApiResponse } from "next"
import {deserialize, DrupalNode, getSearchIndex} from "next-drupal"
import {loadNodes} from "@/lib/load-data";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    try {
        const body = JSON.parse(request.body)
        const { index } = request.query
        let results = await getSearchIndex<DrupalNode>(index as string, body)
        results.nodes = await loadNodes(deserialize(results) as DrupalNode[])
        response.json(results)
    } catch (error) {
        return response.status(400).json(error.message)
    }
}