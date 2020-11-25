import fetchingStatus from '../constants/status';
import { tokenSelector } from '../selectors/authSelector';

export const SET_PERMISSION = '@@permission/SET_PERMISSION';

const setPermission = ({
  status,
  points = 0,
  unlockedExperienceRecords = [],
  unlockedSalaryWorkTimeRecords = [],
  error = null,
}) => ({
  type: SET_PERMISSION,
  points,
  unlockedExperienceRecords,
  unlockedSalaryWorkTimeRecords,
  status,
  error,
});

export const fetchMyUnlockedContentsAndPoints = () => (
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const token = tokenSelector(state);
  dispatch(setPermission({ status: fetchingStatus.FETCHING }));
  return api.me
    .getMyUnlockedContentsAndPoints({ token })
    .then(rawData => {
      if (rawData.me) {
        dispatch(
          setPermission({
            status: fetchingStatus.FETCHED,
            points: rawData.me.points || 0,
            unlockedExperienceRecords:
              rawData.me.unlocked_experience_records || [],
            unlockedSalaryWorkTimeRecords:
              rawData.me.unlocked_salary_work_time_records || [],
          }),
        );
      } else {
        throw Error('me object is not in response');
      }
    })
    .catch(error => {
      dispatch(setPermission({ status: fetchingStatus.ERROR, error }));
    });
};