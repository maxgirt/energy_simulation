/*
  Warnings:

  - You are about to drop the `CarArrivalEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChargePointStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EnergyConsumptionAggregate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `actualMaxPowerDemand` to the `SimulationSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `concurrencyFactor` to the `SimulationSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theoreticalMaxPowerDemand` to the `SimulationSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalEnergyConsumed` to the `SimulationSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CarArrivalEvent" DROP CONSTRAINT "CarArrivalEvent_simulationSessionId_fkey";

-- DropForeignKey
ALTER TABLE "ChargePointStatus" DROP CONSTRAINT "ChargePointStatus_simulationSessionId_fkey";

-- DropForeignKey
ALTER TABLE "EnergyConsumptionAggregate" DROP CONSTRAINT "EnergyConsumptionAggregate_simulationSessionId_fkey";

-- AlterTable
ALTER TABLE "SimulationSession" ADD COLUMN     "actualMaxPowerDemand" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "concurrencyFactor" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "theoreticalMaxPowerDemand" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalEnergyConsumed" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "CarArrivalEvent";

-- DropTable
DROP TABLE "ChargePointStatus";

-- DropTable
DROP TABLE "EnergyConsumptionAggregate";
