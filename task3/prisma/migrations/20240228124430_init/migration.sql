-- CreateTable
CREATE TABLE "SimulationSession" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "simulationParametersId" INTEGER NOT NULL,

    CONSTRAINT "SimulationSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimulationParameters" (
    "id" SERIAL NOT NULL,
    "numberOfChargePoints" INTEGER NOT NULL,
    "arrivalProbabilityMultiplier" INTEGER NOT NULL DEFAULT 100,
    "consumption" DOUBLE PRECISION NOT NULL DEFAULT 18,
    "chargingPower" DOUBLE PRECISION NOT NULL DEFAULT 11,

    CONSTRAINT "SimulationParameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChargePointStatus" (
    "id" SERIAL NOT NULL,
    "simulationSessionId" INTEGER NOT NULL,
    "tick" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "ChargePointStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarArrivalEvent" (
    "id" SERIAL NOT NULL,
    "simulationSessionId" INTEGER NOT NULL,
    "tick" INTEGER NOT NULL,
    "demandKm" DOUBLE PRECISION NOT NULL,
    "energyConsumed" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CarArrivalEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnergyConsumptionAggregate" (
    "id" SERIAL NOT NULL,
    "simulationSessionId" INTEGER NOT NULL,
    "totalEnergyConsumed" DOUBLE PRECISION NOT NULL,
    "actualMaxPowerDemand" DOUBLE PRECISION NOT NULL,
    "concurrencyFactor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EnergyConsumptionAggregate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SimulationSession" ADD CONSTRAINT "SimulationSession_simulationParametersId_fkey" FOREIGN KEY ("simulationParametersId") REFERENCES "SimulationParameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargePointStatus" ADD CONSTRAINT "ChargePointStatus_simulationSessionId_fkey" FOREIGN KEY ("simulationSessionId") REFERENCES "SimulationSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarArrivalEvent" ADD CONSTRAINT "CarArrivalEvent_simulationSessionId_fkey" FOREIGN KEY ("simulationSessionId") REFERENCES "SimulationSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnergyConsumptionAggregate" ADD CONSTRAINT "EnergyConsumptionAggregate_simulationSessionId_fkey" FOREIGN KEY ("simulationSessionId") REFERENCES "SimulationSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
