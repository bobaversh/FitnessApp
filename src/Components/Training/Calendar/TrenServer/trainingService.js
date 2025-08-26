const STORAGE_KEY = 'workoutApp'

export const getData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { templates: [], workouts: [] }
}

export const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getTemplates = () => getData().templates;

export const saveTemplate = (template) => {
  const data = getData();
  const newTemplate = { ...template, id: Date.now().toString() };
  data.templates.push(newTemplate);
  saveData(data)
  return newTemplate
};

export const getWorkoutsByDate = (date) => {
  return getData().workouts.filter(w => w.date === date);
};

export const addWorkout = (date, templateId) => {
  const data = getData();
  const template = data.templates.find(t => t.id === templateId)
  if (!template) throw new Error('Template not found');
  
  const newWorkout = {
    id: Date.now().toString(),
    date,
    templateId,
    name: template.name, 
    exercises: template.exercises.map(ex => ({
      ...ex,
      sets: ex.sets.map(set => ({ ...set }))
    }))
  };
  
  data.workouts.push(newWorkout);
  saveData(data);
  return newWorkout;
};

export const deleteWorkout = (workoutId) => {
  const data = getData();
  const initialCount = data.workouts.length;
  
  data.workouts = data.workouts.filter(w => w.id !== workoutId);
  
  if (data.workouts.length < initialCount) {
    saveData(data);
    return true;
  }
  
  return false; 
};

export const deleteTemplate = (templateId) => {
  const data = getData();
  const initialCount = data.templates.length;
  
  data.templates = data.templates.filter(t => t.id !== templateId);
  
  if (data.templates.length < initialCount) {
    saveData(data);
    return true;
  }
  
  return false; 
};