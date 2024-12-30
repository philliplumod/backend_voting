-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_initial" TEXT,
    "last_name" TEXT NOT NULL,
    "suffix" TEXT,
    "contact_number" TEXT NOT NULL,
    "year_level" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qr_code" TEXT NOT NULL,
    "user_role_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "role_id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "Votes" (
    "vote_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ballot_id" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,
    "vote_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("vote_id")
);

-- CreateTable
CREATE TABLE "Ballot" (
    "ballot_id" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,
    "year_level_eligibility" INTEGER NOT NULL,
    "opening_date" TIMESTAMP(3) NOT NULL,
    "closing_date" TIMESTAMP(3) NOT NULL,
    "generatedBy" TEXT NOT NULL,
    "qr_code" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ballot_pkey" PRIMARY KEY ("ballot_id")
);

-- CreateTable
CREATE TABLE "Ballot_Results" (
    "result_id" TEXT NOT NULL,
    "ballot_id" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,
    "vote_date" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ballot_Results_pkey" PRIMARY KEY ("result_id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "candidate_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_initial" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "suffix" TEXT,
    "candidate_number" INTEGER NOT NULL,
    "position_id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("candidate_id")
);

-- CreateTable
CREATE TABLE "Position" (
    "position_id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "max_vote" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("position_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_role_key" ON "UserRole"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Ballot_qr_code_key" ON "Ballot"("qr_code");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_position_id_candidate_number_key" ON "Candidate"("position_id", "candidate_number");

-- CreateIndex
CREATE UNIQUE INDEX "Position_position_key" ON "Position"("position");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "UserRole"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_ballot_id_fkey" FOREIGN KEY ("ballot_id") REFERENCES "Ballot"("ballot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("candidate_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ballot" ADD CONSTRAINT "Ballot_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("candidate_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ballot" ADD CONSTRAINT "Ballot_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ballot" ADD CONSTRAINT "Ballot_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("position_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ballot_Results" ADD CONSTRAINT "Ballot_Results_ballot_id_fkey" FOREIGN KEY ("ballot_id") REFERENCES "Ballot"("ballot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ballot_Results" ADD CONSTRAINT "Ballot_Results_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("candidate_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("position_id") ON DELETE RESTRICT ON UPDATE CASCADE;
