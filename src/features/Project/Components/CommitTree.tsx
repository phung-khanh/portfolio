import { Tooltip as MuiTooltip } from "@mui/material";
import GitHubCalendar from "react-github-calendar";

const CommitTree = ({ username }: { username: string }) => {
  return (
    <div className="p-4 bg-gray-900 rounded-lg flex flex-col items-center">
      <div className="w-full overflow-x-auto flex justify-center">
        <div className="min-w-[300px] max-w-full">
          <GitHubCalendar
            username={username}
            renderBlock={(block, activity) => (
              <MuiTooltip
                title={`${activity.count} activities on ${activity.date}`}
              >
                {block}
              </MuiTooltip>
            )}
            renderColorLegend={(block, level) => (
              <MuiTooltip title={`Level: ${level}`}>{block}</MuiTooltip>
            )}
            blockSize={12}  
            blockMargin={5}
            blockRadius={3}
            fontSize={16}
            weekStart={1}
            labels={{
              totalCount: "{{count}} contributions in the last half year",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default CommitTree;
