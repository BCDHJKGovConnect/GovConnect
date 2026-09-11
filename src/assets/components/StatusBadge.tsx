interface StatusBadgeProps {
  status: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
  let className = "status-badge";

  if (
    status === "ONLINE" ||
    status === "Verified" ||
    status === "Approved"
  ) {
    className += " online";
  } else if (
    status === "OFFLINE" ||
    status === "Pending" ||
    status === "Under Verification"
  ) {
    className += " offline";
  } else {
    className += " offline";
  }

  return (
    <span className={className}>
      {status}
    </span>
  );
}

export default StatusBadge;