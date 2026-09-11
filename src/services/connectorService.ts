import express from "express";

const router = express.Router();

interface ConnectorRequest {
  endpoint: string;
  method?: string;
}

router.post("/call", async (req, res) => {
  const { endpoint, method = "GET" } = req.body as ConnectorRequest;

  if (!endpoint) {
    return res.status(400).json({
      success: false,
      message: "Endpoint is required"
    });
  }

  try {
    const response = await fetch(endpoint, {
      method
    });

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: `Department API returned status ${response.status}`
      });
    }

    const data = await response.json();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to connect to department service"
    });
  }
});

export default router;