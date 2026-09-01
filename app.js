const tickets = [
  {id:"SIM-1001", status:"Pending", type:"Stop & Return", ops:"No response", age:"3h"},
  {id:"SIM-1002", status:"Pending", type:"Normal", ops:"Responded", age:"45m"},
  {id:"SIM-1003", status:"Pending", type:"Stop & Return", ops:"No response", age:"6h"},
  {id:"SIM-1004", status:"Resolved", type:"Normal", ops:"Responded", age:"1d"},
  {id:"SIM-1005", status:"Pending", type:"Normal", ops:"No response", age:"8h"}
];

const $ = id => document.getElementById(id);

function render() {
  const filter = $("filter").value;
  const filtered = tickets.filter(t => {
    if (filter === "pending") return t.status === "Pending";
    if (filter === "stop-return") return t.type === "Stop & Return";
    if (filter === "no-response") return t.ops === "No response";
    return true;
  });

  $("total").textContent = tickets.length;
  $("pending").textContent = tickets.filter(t => t.status === "Pending").length;
  $("stopReturn").textContent = tickets.filter(t => t.type === "Stop & Return").length;
  $("noResponse").textContent = tickets.filter(t => t.ops === "No response").length;

  $("tickets").innerHTML = filtered.length ? filtered.map(t => `
    <article class="ticket">
      <div class="ticket-top">
        <span class="id">${t.id}</span>
        <span class="badge">${t.status}</span>
      </div>
      <div class="meta">Type: ${t.type} · Ops: ${t.ops} · Age: ${t.age}</div>
      <div class="actions">
        <button onclick="review('${t.id}')">Review</button>
        <button onclick="simulate('${t.id}')">Simulate Action</button>
      </div>
    </article>
  `).join("") : '<div class="empty">No tickets match this filter.</div>';
}

function review(id) {
  alert(`Review ${id}: manual review required before any real action.`);
}

function simulate(id) {
  alert(`Simulation only: no real ticket was changed for ${id}.`);
}

$("filter").addEventListener("change", render);
$("runBtn").addEventListener("click", () => {
  $("runBtn").textContent = "Checked ✓";
  setTimeout(() => $("runBtn").textContent = "Run Check", 1200);
  render();
});

render();
