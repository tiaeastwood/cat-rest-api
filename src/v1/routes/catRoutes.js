const express = require("express");
const catController = require("../controllers/catController");
const router = express.Router();

router.get("/", catController.getAllCats);

router.get("/:catId", catController.getOneCat);

router.post("/", catController.createNewCat);

router.patch("/:catId", catController.updateOneCat);

router.delete("/:catId", catController.deleteOneCat);

module.exports = router;

/**
 * @openapi
 * /api/v1/cats:
 *   get:
 *     summary: Get all cats
 *     tags:
 *       - Cats
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Cat"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */

/**
 * @openapi
 * /api/v1/cats:
 *   post:
 *     summary: Add a new cat
 *     tags:
 *       - Cats
 *     parameters:
 *       - in: query
 *         name: New Cat
 *         schema:
 *           type: object
 *         description: A cat object
 *     requestBody:
 *       description: Add a new cat
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/NewCat'
 *     responses:
 *       201:
 *         description: Created
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */



/**
 * @openapi
 * /api/v1/cats/{catId}:
 *   delete:
 *     summary: Delete a cat by ID
 *     tags:
 *       - Cats
 *     parameters:
 *       - name: catId
 *         in: path
 *         description: catId to delete
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Deleted
 *       400: Invalid ID supplied
 *       404: Cat with that ID not found
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
