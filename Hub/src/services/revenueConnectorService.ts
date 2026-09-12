import { retryRequest } from "./retryService";

export const fetchRevenueData = async (
  revenueSystemId: string
) => {

  const result = await retryRequest(async () => {

    const response = await fetch(
      `http://localhost:7103/api/revenue/taxpayers/${revenueSystemId}`
    );

    if (!response.ok) {
      throw new Error(
        `Revenue Department returned status ${response.status}`
      );
    }

    return await response.json();
  });

  return {
    systemId: result.data.taxpayerId,
    taxpayerStatus: result.data.taxpayerStatus,
    taxClearanceStatus: result.data.taxClearanceStatus,
    outstandingAmount: result.data.outstandingAmount,
    verificationStatus: result.data.verificationStatus
  };
};