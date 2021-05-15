export function Listing({ subjects, singular, plural = undefined }) {
  if (!subjects) return <div></div>;

  if (!Array.isArray(subjects)) {
    return (
      <div style={{ textAlign: "right" }}>
        {" "}
        <span>
          <strong>{singular}:</strong> {singular === "Linguagem" ? subjects.toUpperCase() : subjects}
        </span>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "right" }}>
      <span>
        {subjects?.length === 1 ? (
          <span>
            <strong>{singular}:</strong> {subjects}
          </span>
        ) : (
          <span>
            <strong>{plural && plural}:</strong>{" "}
            <span>
              {subjects &&
                subjects.map((subject: {}, idx: string | number) =>
                  subjects[idx] === subjects[subjects.length - 1] ? (
                    <span> {subject}</span>
                  ) : (
                    <span> {subject},</span>
                  )
                )}
            </span>
          </span>
        )}
      </span>
    </div>
  );
}
