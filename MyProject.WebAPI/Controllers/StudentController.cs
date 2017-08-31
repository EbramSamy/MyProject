using MyProject.DataAccess.Model;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace MyProject.WebAPI.Controllers
{
    public class StudentController : ApiController
    {
        // GET api/Students
        public IEnumerable<Student> Get()
        {
            using (MyProjectDbEntities db = new MyProjectDbEntities())
            {
                return db.Students.ToList();
            }
        }

        // GET api/Students/5
        public Student Get(int id)
        {
            using (MyProjectDbEntities db = new MyProjectDbEntities())
            {
                return db.Students.FirstOrDefault(s=>s.S_Id==id);
            }
        }

        // POST api/Students
        public void Post([FromBody]Student student)
        {
            using (MyProjectDbEntities db = new MyProjectDbEntities())
            {
                db.Students.Add(student);
                db.SaveChanges();
            }
        }

        // PUT api/Students/5
        public void Put(int id, [FromBody]Student updatedStudent)
        {
            using (MyProjectDbEntities db = new MyProjectDbEntities())
            {
                var existStudent = db.Students.FirstOrDefault(s => s.S_Id == id);
                existStudent.S_Name=updatedStudent.S_Name;
                db.SaveChanges();
            }
        }

        // DELETE api/Students/5
        public void Delete(int id)
        {
            using (MyProjectDbEntities db = new MyProjectDbEntities())
            {
                var existStudent = db.Students.FirstOrDefault(s => s.S_Id == id);
                db.Students.Remove(existStudent);
                db.SaveChanges();
            }
        }
    }
}
