// ===============================
// TICKET AUTOMATION DASHBOARD
// ===============================

const tickets = [
  {
    id: "SIM-1001",
    title: "Ticket requires review",
    status: "Pending",
    type: "Stop & Return",
    ops: "No response"
  },
  {
    id: "SIM-1002",
    title: "Operations response pending",
    status: "Pending",
    type: "Normal",
    ops: "No response"
  },
  {
    id: "SIM-1003",
    title: "Stop & Return request",
    status: "Pending",
    type: "Stop & Return",
    ops: "Responded"
  },
  {
    id: "SIM-1004",
    title: "Awaiting operations response",
    status: "Pending",
    type: "Normal",
    ops: "No response"
  },
  {
    id: "SIM-1005",
    title: "Ticket under review",
    status: "Pending",
    type: "Normal",
    ops: "Responded"
  }
];

// ===============================
// HELPER
// ===============================

function $(id) {
  return document.getElementById(id);
}

// ===============================
// UPDATE DASHBOARD COUNTERS
// ===============================

function updateCounters() {
  if ($("total")) {
    $("total").textContent = tickets.length;
  }

  if ($("pending")) {
    $("pending").textContent =
      tickets.filter(t => t.status === "Pending").length;
  }

  if ($("stopReturn")) {
    $("stopReturn").textContent =
      tickets.filter(t => t.type === "Stop & Return").length;
  }

  if ($("noResponse")) {
    $("noResponse").textContent =
      tickets.filter(t => t.ops === "No response").length;
  }
}

// ===============================
// RENDER TICKETS
// ===============================

function render() {
  const filter = $("filter") ? $("filter").value : "all";
  const search = $("search")
    ? $("search").value.toLowerCase().trim()
    : "";

  const filtered = tickets.filter(ticket => {

    // Search by Ticket ID
    if (
      search &&
      !ticket.id.toLowerCase().includes(search)
    ) {
      return false;
    }

    // Status/type filters
    if (
      filter === "pending" &&
      ticket.status !== "Pending"
    ) {
      return false;
    }

    if (
      filter === "stop-return" &&
      ticket.type !== "Stop & Return"
    ) {
      return false;
    }

    if (
      filter === "no-response" &&
      ticket.ops !== "No response"
    ) {
      return false;
    }

    return true;
  });

  const ticketList = $("ticketList");

  if (!ticketList) {
    console.error("ticketList element not found");
    return;
  }

  if (filtered.length === 0) {
    ticketList.innerHTML = `
      <div class="empty-state">
        <p>No tickets found.</p>
      </div>
    `;
    return;
  }

  ticketList.innerHTML = filtered.map(ticket => `
    <div class="ticket-card">

      <div class="ticket-main">

        <div class="ticket-id">
          ${ticket.id}
        </div>

        <div class="ticket-title">
          ${ticket.title}
        </div>

        <div class="ticket-details">
          <span>
            Status: ${ticket.status}
          </span>

          <span>
            Type: ${ticket.type}
          </span>

          <span>
            Ops: ${ticket.ops}
          </span>
        </div>

      </div>

      <div class="ticket-actions">

        <button
          onclick="reviewTicket('${ticket.id}')">
          Review
        </button>

        <button
          onclick="simulateAction('${ticket.id}')">
          Simulate Action
        </button>

      </div>

    </div>
  `).join("");
}

// ===============================
// REVIEW TICKET
// ===============================

function reviewTicket(ticketId) {
  alert(
    `Review ${ticketId}: manual review required before any real action.`
  );
}

// ===============================
// SIMULATE ACTION
// ===============================

function simulateAction(ticketId) {
  alert(
    `Simulation only: no real ticket was changed for ${ticketId}.`
  );
}

// ===============================
// RUN CHECK
// ===============================

function runChecks() {
  const pending = tickets.filter(
    t => t.status === "Pending"
  ).length;

  const noResponse = tickets.filter(
    t => t.ops === "No response"
  ).length;

  alert(
    `Check completed.\n\n` +
    `Pending tickets: ${pending}\n` +
    `No Ops Response: ${noResponse}\n\n` +
    `No real ticket was changed.`
  );
}

// ===============================
// EVENT LISTENERS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  updateCounters();
  render();
});

render();
