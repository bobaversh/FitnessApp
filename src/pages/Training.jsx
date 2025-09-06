import Calendar from "../Components/Calendar/Calendar";
import Templates from "../Components/Templates/Templates";
import CreateTemplate from "../Components/CreateTemplates/CreateTemplate";
import { useEffect, useState } from "react";
import {
  getWorkoutsByDate,
  getTemplates,
  deleteWorkout,
  deleteTemplate,
} from "../Server/trainingService";
import WorkoutInDate from "../Components/WorkoutInDate/WorkoutInDate";
import DeleteItem from "../Components/DeleteItem/DeleteItem";
import TrainingProcess from "../Components/TrainingProcess/TrainingProcess";

export default function Training() {
  const [hasWorkout, setHasWorkout] = useState([]);
  const [hasTemplates, setHasTemplates] = useState([]);
  const [selectDate, setSelectDate] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPage, setShowPage] = useState("workout");
  const [currentWorkout, setCurrentWorkout] = useState(null);

  const loadWorkouts = () => {
    const workoutsForDate = getWorkoutsByDate(selectDate);
    setHasWorkout(workoutsForDate || []);
  };

  const loadTemplates = () => {
    const templates = getTemplates();
    setHasTemplates(templates || []);
  };

  const handleConfirmDelete = (confirmed) => {
    if (confirmed && deleteItem) {
      try {
        if (deleteItem.type === "workout") {
          deleteWorkout(deleteItem.id);
          loadWorkouts();
        } else if (deleteItem.type === "template") {
          deleteTemplate(deleteItem.id);
          loadTemplates();
        }
      } catch (error) {
        console.error("Ошибка удаления:", error);
      }
    }
    setShowDeleteModal(false);
    setDeleteItem(null);
  };
  const handleSetShowPage = (pageInfo) => {
    if (typeof pageInfo === "string") {
      setShowPage(pageInfo);
      setCurrentWorkout(null);
    } else if (
      typeof pageInfo === "object" &&
      pageInfo.page === "trainingProcess"
    ) {
      setShowPage("trainingProcess");
      setCurrentWorkout(pageInfo.workout);
    }
  };

  useEffect(() => {
    console.log("Current page:", showPage);
  }, [showPage]);

  useEffect(() => {
    if (selectDate) {
      loadWorkouts();
      loadTemplates();
    }
  }, [selectDate]);

  return (
    <div style={{ marginBottom: "150px" }}>
      {showDeleteModal && (
        <DeleteItem
          onConfirm={handleConfirmDelete}
          itemType={deleteItem?.type}
        />
      )}

      <Calendar setSelectDate={setSelectDate} />
      {selectDate && (
        <div>
          {showPage == "workout" && (
            <>
              <WorkoutInDate
                workouts={hasWorkout}
                setShowPage={handleSetShowPage}
                onDelete={(id) => {
                  setDeleteItem({ id, type: "workout" });
                  setShowDeleteModal(true);
                }}
              />
            </>
          )}
          {showPage == "template" && (
            <>
              <Templates
                setShowPage={handleSetShowPage}
                templates={hasTemplates}
                date={selectDate}
                onDelete={(id) => {
                  setDeleteItem({ id, type: "template" });
                  setShowDeleteModal(true);
                }}
              />
            </>
          )}
          {showPage === "createTemplate" && (
            <>
              <CreateTemplate setShowPage={handleSetShowPage} />
            </>
          )}
          {showPage === "trainingProcess" && currentWorkout && (
            <TrainingProcess
              workout={currentWorkout}
              setShowPage={handleSetShowPage}
            />
          )}
        </div>
      )}
    </div>
  );
}
