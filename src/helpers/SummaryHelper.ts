export function updateSummary(state: any) {

    for (const key in state.active) {
        state.archived[key as keyof typeof state.active] =0;
        state.active[key as keyof typeof state.active] =0;
    }

    for (const iterator of state.notes) {
        for (const key in state.active) {
            if (key.toLowerCase() == iterator.getCategory().toLowerCase().replaceAll(" ", "")) {

                if (iterator.isArchived) {
                    state.archived[key as keyof typeof state.active] += 1;
                } else {
                    state.active[key as keyof typeof state.active] += 1;
                }
            }
        }
    }
}