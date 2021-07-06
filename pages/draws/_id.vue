<template>
  <div class="flex flex-col items-center pt-20">
    <div
      class="
        text-2xl
        font-bold
        md:text-3xl
        text-indigo-500
        flex
        justify-between
        w-2/3
        px-8
      "
    >
      <div class="flex">
        <router-link to="/">
          <button class="rounded bg-indigo-500 text-white text-base px-8 py-2">
            Home
          </button>
        </router-link>
        <router-link to="#">
          <button
            @click="printOnlineSoldTickets"
            class="rounded bg-indigo-500 text-white text-base px-8 py-2 ml-2"
          >
            Print Online Sold Tickets
          </button>
        </router-link>
      </div>
      <div><p>Draw's ticket entries</p></div>
    </div>
    <div
      class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 -my-2 lg:-mx-8 lg:w-2/3"
    >
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <v-client-table
            filterable="true"
            :columns="columns"
            :data="tickets"
            class="p-4"
          >
            <span slot="Fullname" slot-scope="props">
              {{ props.row.User.firstName }} {{ props.row.User.lastName }}
            </span>
            <span slot="Email" slot-scope="props">
              {{ props.row.User.email }}
            </span>
            <span slot="Phone" slot-scope="props">
              {{ props.row.User.contact }}
            </span>
            <span slot="Address" slot-scope="props">
              {{ props.row.User.address }}
            </span>
            <span slot="draw date" slot-scope="props">
              {{ formatDate(new Date(props.row.Draw.drawDate)) }}
            </span>
            <div slot="free" slot-scope="props">
              <span
                class="
                  inline-flex
                  text-xs
                  leading-5
                  font-semibold
                  text-green-600
                "
              >
                {{ props.row.isFree ? "True" : "False" }}
              </span>
            </div>
          </v-client-table>

          <div class="py-4 px-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default {
  middleware: "auth",
  data() {
    return {
      tickets: [],
      columns: [
        "ticketNumber",
        "Fullname",
        "Email",
        "Phone",
        "Address",
        "draw date",
        "free",
      ],
    };
  },
  methods: {
    formatDate(d) {
      let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
      let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
      return `${da}-${mo}-${ye}`;
    },
    async printTicketsWithDuplicate() {
      let ticketsContents = [];
      let filterOnlineTickets = this.tickets.filter(
        (el) => el.isSaleOnline == false
      );
      for (let i = 0; i < filterOnlineTickets.length; i++) {
        ticketsContents.push(
          ...[
            {
              columns: [
                {
                  qr: `${filterOnlineTickets[i].id} ${filterOnlineTickets[i].Draw.licence} ${filterOnlineTickets[i].ticketNumber} ${filterOnlineTickets[i].User.email}`,
                  fit: "58",
                },
                {
                  alignment: "left",
                  width: 200,
                  margin: [0, 0, 40, 0],
                  type: "none",
                  ol: [
                    {
                      type: "none",
                      ol: [
                        {
                          margin: [0, 4, 0, 0],
                          fontSize: 8,
                          text: "ST. THOMAS AQUINAS PARISH",
                          alignment: "center",
                        },
                        {
                          fontSize: 7,
                          text: "PO Box 157",
                          alignment: "center",
                        },
                        {
                          fontSize: 7,
                          text: "St. Lawrence, NL A0E 2V0",
                          alignment: "center",
                          margin: [0, 0, 0, 6],
                        },
                        {
                          fontSize: 8,
                          alignment: "center",
                          bold: true,
                          text: `${filterOnlineTickets[i].Draw.description}`.toUpperCase(),
                        },

                        {
                          fontSize: 8,
                          alignment: "center",
                          text: `License Number: ${filterOnlineTickets[i].Draw.licence}`,
                        },
                      ],
                    },
                  ],
                },

                {
                  qr: `${filterOnlineTickets[i].id} ${filterOnlineTickets[i].Draw.licence} ${filterOnlineTickets[i].ticketNumber} ${filterOnlineTickets[i].User.email}`,
                  fit: "58",
                },
                {
                  alignment: "left",
                  width: 200,
                  margin: [0, 0, 40, 0],
                  type: "none",
                  ol: [
                    {
                      type: "none",
                      ol: [
                        {
                          margin: [0, 4, 0, 0],
                          fontSize: 8,
                          text: "ST. THOMAS AQUINAS PARISH",
                          alignment: "center",
                        },
                        {
                          fontSize: 7,
                          text: "PO Box 157",
                          alignment: "center",
                        },
                        {
                          fontSize: 7,
                          text: "St. Lawrence, NL A0E 2V0",
                          alignment: "center",
                          margin: [0, 0, 0, 6],
                        },
                        {
                          fontSize: 8,
                          alignment: "center",
                          bold: true,
                          text: `${filterOnlineTickets[i].Draw.description}`.toUpperCase(),
                        },

                        {
                          fontSize: 8,
                          alignment: "center",
                          text: `License Number: ${filterOnlineTickets[i].Draw.licence}`,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              columns: [
                {
                  fontSize: 8,

                  text: `No. ${filterOnlineTickets[i].ticketNumber}\nPRIZES:`,
                  bold: true,
                },
                {
                  fontSize: 8,

                  text: `No. ${filterOnlineTickets[i].ticketNumber}\nPRIZES:`,
                  bold: true,
                },
              ],
            },

            {
              columns: [
                {
                  margin: [0, 8, 0, 0],
                  fontSize: 8,
                  text: `1st Prize: $2,000\n2nd Prize: $1,000\n3rd Prize: $500\nConsolation Prizes (3- $200 each)`,
                },
                {
                  alignment: "left",
                  margin: [0, 8, 0, 0],
                  fontSize: 8,
                  text: `Name:     __________________________________________________\nAddress:  __________________________________________________\nContact No. ______________________________________________`,
                },
              ],
            },

            {
              margin: [0, 10, 0, 0],

              columns: [
                {
                  fontSize: 8,
                  text: `Draw Date: ${this.formatDate(
                    new Date(filterOnlineTickets[i].Draw.drawDate)
                  )}`,
                },

                {
                  fontSize: 8,
                  text: `Draw Date: ${this.formatDate(
                    new Date(filterOnlineTickets[i].Draw.drawDate)
                  )}`,
                },
              ],
            },
            {
              fontSize: 8,
              text: "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -",
            },
          ]
        );
      }

      var docDefinition = {
        content: [
          ticketsContents,
          // basic usage
          // { qr: "text in QR" },
          // // colored QR
          // { qr: "text in QR", foreground: "red", background: "yellow" },
          // // resized QR
          // { qr: "text in QR", fit: "500" },
        ],
      };
      let pdfDocGenerator = await pdfMake.createPdf(docDefinition);
      pdfDocGenerator.print();
    },
    async printOnlineSoldTickets() {
      let ticketsContents = [];
      let filterOnlineTickets = this.tickets.filter(
        (el) => el.isSaleOnline == true
      );
      for (let i = 1; i < filterOnlineTickets.length; i = i + 2) {
        try {
          ticketsContents.push(
            ...[
              {
                columns: [
                  {
                    alignment: "left",
                    margin: [0, 0, 0, 0],
                    type: "none",
                    ol: [
                      {
                        qr: `${filterOnlineTickets[i - 1].id} ${
                          filterOnlineTickets[i - 1].ticketNumber
                        } ${filterOnlineTickets[i - 1].Draw.licence} ${
                          filterOnlineTickets[i - 1].User.email
                        }`,
                        fit: "110",
                      },
                      {
                        margin: [0, 8, 0, 0],
                        fontSize: 7,

                        text: `No. ${filterOnlineTickets[i - 1].ticketNumber}`,
                        bold: true,
                      },
                    ],
                  },

                  {
                    alignment: "left",
                    width: 160,
                    margin: [0, 0, 0, 0],
                    type: "none",
                    ol: [
                      {
                        type: "none",
                        ol: [
                          {
                            margin: [0, 0, 0, 0],
                            fontSize: 8,
                            text: "ST. THOMAS AQUINAS PARISH",
                          },
                          {
                            fontSize: 7,
                            text: "PO Box 157",
                          },
                          {
                            fontSize: 7,
                            text: "St. Lawrence, NL A0E 2V0",

                            margin: [0, 0, 0, 6],
                          },
                          {
                            fontSize: 8,

                            bold: true,
                            text: `${
                              filterOnlineTickets[i - 1].Draw.description
                            }`.toUpperCase(),
                          },

                          {
                            fontSize: 8,

                            text: `License No: ${
                              filterOnlineTickets[i - 1].Draw.licence
                            }`,
                          },
                          {
                            margin: [0, 8, 0, 0],
                            fontSize: 8,
                            text: `1st Prize: $2,000\n2nd Prize: $1,000\n3rd Prize: $500\nConsolation Prizes (3- $200 each)`,
                          },
                          {
                            margin: [0, 8, 0, 0],
                            fontSize: 8,
                            text: `Draw Date: ${this.formatDate(
                              new Date(filterOnlineTickets[i - 1].Draw.drawDate)
                            )}`,
                          },
                        ],
                      },
                    ],
                  },

                  {
                    alignment: "left",

                    type: "none",
                    ol: [
                      {
                        type: "none",
                        ol: [
                          {
                            qr: `${filterOnlineTickets[i].id} ${filterOnlineTickets[i].ticketNumber} ${filterOnlineTickets[i].Draw.licence} ${filterOnlineTickets[i].User.email}`,
                            fit: "110",
                          },
                          {
                            margin: [0, 8, 0, 0],
                            fontSize: 7,

                            text: `No. ${filterOnlineTickets[i].ticketNumber}`,
                            bold: true,
                          },
                        ],
                      },
                    ],
                  },

                  {
                    alignment: "left",
                    width: 200,

                    type: "none",
                    ol: [
                      {
                        type: "none",
                        ol: [
                          {
                            margin: [0, 0, 0, 0],
                            fontSize: 8,
                            text: "ST. THOMAS AQUINAS PARISH",
                          },
                          {
                            fontSize: 7,
                            text: "PO Box 157",
                          },
                          {
                            fontSize: 7,
                            text: "St. Lawrence, NL A0E 2V0",

                            margin: [0, 0, 0, 6],
                          },
                          {
                            fontSize: 8,

                            bold: true,
                            text: `${filterOnlineTickets[i].Draw.description}`.toUpperCase(),
                          },

                          {
                            fontSize: 8,

                            text: `License No: ${filterOnlineTickets[i].Draw.licence}`,
                          },
                          {
                            margin: [0, 8, 0, 0],
                            fontSize: 8,
                            text: `1st Prize: $2,000\n2nd Prize: $1,000\n3rd Prize: $500\nConsolation Prizes (3- $200 each)`,
                          },
                          {
                            margin: [0, 8, 0, 0],
                            fontSize: 8,
                            text: `Draw Date: ${this.formatDate(
                              new Date(filterOnlineTickets[i - 1].Draw.drawDate)
                            )}`,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              {
                margin: [0, 0, 0, 4],
                fontSize: 8,
                text: "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -",
              },
            ]
          );
        } catch (err) {}
      }
      if (filterOnlineTickets.length % 2 == 1) {
        ticketsContents.push(
          ...[
            {
              margin: [0, 4, 0, 0],
              fontSize: 8,
              text: "ST. THOMAS AQUINAS PARISH",
              alignment: "center",
            },
            {
              fontSize: 7,
              text: "PO Box 157",
              alignment: "center",
            },
            {
              fontSize: 7,
              text: "St. Lawrence, NL A0E 2V0",
              alignment: "center",
              margin: [0, 0, 0, 6],
            },
            {
              fontSize: 8,
              alignment: "center",
              bold: true,
              text: `${
                filterOnlineTickets[filterOnlineTickets.length - 1].Draw
                  .description
              }`.toUpperCase(),
            },

            {
              fontSize: 8,
              alignment: "center",
              text: `License Number: ${
                filterOnlineTickets[filterOnlineTickets.length - 1].Draw.licence
              }`,
            },

            {
              fontSize: 8,

              text: `PRIZES:`,
              bold: true,
            },
            {
              columns: [
                {
                  margin: [0, 8, 0, 0],
                  fontSize: 8,
                  text: `1st Prize: $2,000\n2nd Prize: $1,000\n3rd Prize: $500\nConsolation Prizes (3- $200 each)`,
                },
                {
                  alignment: "right",
                  qr: `${
                    filterOnlineTickets[filterOnlineTickets.length - 1].id
                  } ${
                    filterOnlineTickets[filterOnlineTickets.length - 1].Draw
                      .licence
                  } ${
                    filterOnlineTickets[filterOnlineTickets.length - 1]
                      .ticketNumber
                  } ${
                    filterOnlineTickets[filterOnlineTickets.length - 1].User
                      .email
                  }`,
                  fit: "58",
                },
              ],
            },

            {
              margin: [0, 10, 0, 0],

              columns: [
                {
                  fontSize: 8,
                  text: `Draw Date: ${this.formatDate(
                    new Date(
                      filterOnlineTickets[
                        filterOnlineTickets.length - 1
                      ].Draw.drawDate
                    )
                  )}`,
                },
                {
                  fontSize: 8,
                  alignment: "right",
                  text: `TICKET NO. ${
                    filterOnlineTickets[filterOnlineTickets.length - 1]
                      .ticketNumber
                  }`,
                },
              ],
            },
            {
              fontSize: 8,
              text: "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -",
            },
          ]
        );
      }

      var docDefinition = {
        content: [
          ticketsContents,
          // basic usage
          // { qr: "text in QR" },
          // // colored QR
          // { qr: "text in QR", foreground: "red", background: "yellow" },
          // // resized QR
          // { qr: "text in QR", fit: "500" },
        ],
      };
      let pdfDocGenerator = await pdfMake.createPdf(docDefinition);
      pdfDocGenerator.print();
    },
  },
  async created() {
    let response = await this.$axios.get(
      "/api/ticket/getAllByDraw/" + this.$route.params.id
    );
    this.tickets = response.data.tickets;
  },
};
</script>

<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
</style>