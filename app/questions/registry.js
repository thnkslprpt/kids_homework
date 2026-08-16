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

    if (modules.has(id)) {
      throw new Error(`HomeworkQuestions.register received duplicate id: ${id}`);
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

  function replace(definition) {
    const id = String(definition?.id || "").trim();
    if (!id || !modules.has(id)) {
      throw new Error(`HomeworkQuestions.replace requires an existing id: ${id || "(missing)"}`);
    }

    modules.set(id, {
      supportsDrag: false,
      ...definition,
      id,
      label: String(definition.label || id),
    });
  }

  function list() {
    return Array.from(modules.values());
  }

  globalThis.HomeworkQuestions = {
    get,
    list,
    register,
    replace,
  };
})();
