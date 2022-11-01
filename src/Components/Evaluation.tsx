export const unknownEvaluations = ["G", "#", "-"];
export const passEvaluations = ["S", "A", "B", "C", "N"];
export const evaluations = [...unknownEvaluations, ...passEvaluations, "D", "F"].sort().reverse();

export const evaluationConverts = [
    {
        "evaluation": "S",
        "gradePoint": 4
    },
    {
        "evaluation": "A",
        "gradePoint": 4
    },
    {
        "evaluation": "B",
        "gradePoint": 3
    },
    {
        "evaluation": "C",
        "gradePoint": 2
    },
    {
        "evaluation": "D",
        "gradePoint": 1
    },
    {
        "evaluation": "F",
        "gradePoint": 0
    }
];
