(() => {
  const modules = new Map();

  function register(definition) {
    if (!definition || typeof definition !== "object") {
      throw new TypeError("HomeworkQuestions.register expected a module definition.");
    }

    const id = String(definition.id || "").trim();
    if (!id) {
      throw new Error("HomeworkQuestions.register requires an id.");
    }

    modules.set(id, {
      supportsDrag: false,
      ...definition,
      id,
      label: String(definition.label || id),
    });
  }

  function get(id) {
    return modules.get(String(id || "").trim()) || null;
  }

  function list() {
    return Array.from(modules.values());
  }

  globalThis.HomeworkQuestions = {
    get,
    list,
    register,
  };
})();
