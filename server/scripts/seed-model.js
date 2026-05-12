const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Set LLM provider to Ollama
  const existingProvider = await prisma.system_settings.findUnique({
    where: { label: "llm_provider" },
  });
  if (!existingProvider) {
    await prisma.system_settings.create({
      data: { label: "llm_provider", value: "ollama" },
    });
    console.log("[seed] Set llm_provider = ollama");
  }

  // Create default workspace if none exists
  const workspaceCount = await prisma.workspaces.count();
  if (workspaceCount === 0) {
    await prisma.workspaces.create({
      data: {
        name: "My Workspace",
        slug: "my-workspace",
        chatProvider: "ollama",
        chatModel: "command-r7b",
        vectorTag: "my-workspace",
        openAiHistory: 20,
        similarityThreshold: 0.25,
        topN: 4,
        chatMode: "chat",
      },
    });
    console.log("[seed] Created workspace 'My Workspace' with model command-r7b");
  }
}

main()
  .catch((e) => {
    console.error("[seed] Error:", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
