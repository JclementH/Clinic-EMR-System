import { Box } from "@mui/material";

function TeethColumn({children, color, label}) {
  return (
    <div className="h-10vh">
      <Box
        className={`border-solid border-2 border-black`}
        style={{ backgroundColor: color}}
      >
        <p className={"text-center text-white font-bold"}> {label} </p>
      </Box>
      <div className="mt-5"> {children} </div>
    </div>
  );
}

export default TeethColumn;
