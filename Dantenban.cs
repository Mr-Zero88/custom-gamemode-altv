    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace # Name
    {
        class Datenbank : Server
        {
            public static bool DatenbankVerbindung = false;
            public static MySqlConnection Connection;
            public string Host [get; set;]
            public string User [get; set;]
            public string Password [get; set;]
            public string Database [get; set;]

            public Datenbank ()
            {
                this.Host ="localhost";
                this.Username = "altv";
                this.Password = "123456";
                this.Database = "altv";
            }

            public static string GetConnectionString()
            {
            Datenbank sql = new Datenbank();
            string MySqlConnection = $"SERVER={sql.Host};DATABASE={sql.Database};UID={sql.User};PASSWORD={sql.Password};";
            return MySqlConnection;
            }
            {

            public static void InitConnection()
            {
                string SQLConnection = GetConnectionString();
                Connection = new MySqlConnection(SQLConnection);
                try
                {
                    Connection.Open();
                    DatenbankVerbindung = true;
                    Alt.Log("MYSQL", "Verbindung zur Datenbank hergestellt");
                }
                catch (Exception e)
                {
                    DatenbankVerbindung = false;
                    Alt.Log("MYSQL", $"Verbindung zur Datenbank fehlgeschlagen: {e.Message}");
                    Alt.log(e.ToString());
                    System.Threading.Thread.Sleep(5000);
                    InitConnection.Exit(0);
                
                }
            }
        }
    }
}
              