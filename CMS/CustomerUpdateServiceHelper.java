package CMS;


/**
 * Generated from IDL interface "CustomerUpdateService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public abstract class CustomerUpdateServiceHelper
{
	private volatile static org.omg.CORBA.TypeCode _type;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			synchronized(CustomerUpdateServiceHelper.class)
			{
				if (_type == null)
				{
					_type = org.omg.CORBA.ORB.init().create_interface_tc("IDL:CMS/CustomerUpdateService:1.0", "CustomerUpdateService");
				}
			}
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final CMS.CustomerUpdateService s)
	{
			any.insert_Object(s);
	}
	public static CMS.CustomerUpdateService extract(final org.omg.CORBA.Any any)
	{
		return narrow(any.extract_Object()) ;
	}
	public static String id()
	{
		return "IDL:CMS/CustomerUpdateService:1.0";
	}
	public static CustomerUpdateService read(final org.omg.CORBA.portable.InputStream in)
	{
		return narrow(in.read_Object(CMS._CustomerUpdateServiceStub.class));
	}
	public static void write(final org.omg.CORBA.portable.OutputStream _out, final CMS.CustomerUpdateService s)
	{
		_out.write_Object(s);
	}
	public static CMS.CustomerUpdateService narrow(final org.omg.CORBA.Object obj)
	{
		if (obj == null)
		{
			return null;
		}
		else if (obj instanceof CMS.CustomerUpdateService)
		{
			return (CMS.CustomerUpdateService)obj;
		}
		else if (obj._is_a("IDL:CMS/CustomerUpdateService:1.0"))
		{
			CMS._CustomerUpdateServiceStub stub;
			stub = new CMS._CustomerUpdateServiceStub();
			stub._set_delegate(((org.omg.CORBA.portable.ObjectImpl)obj)._get_delegate());
			return stub;
		}
		else
		{
			throw new org.omg.CORBA.BAD_PARAM("Narrow failed");
		}
	}
	public static CMS.CustomerUpdateService unchecked_narrow(final org.omg.CORBA.Object obj)
	{
		if (obj == null)
		{
			return null;
		}
		else if (obj instanceof CMS.CustomerUpdateService)
		{
			return (CMS.CustomerUpdateService)obj;
		}
		else
		{
			CMS._CustomerUpdateServiceStub stub;
			stub = new CMS._CustomerUpdateServiceStub();
			stub._set_delegate(((org.omg.CORBA.portable.ObjectImpl)obj)._get_delegate());
			return stub;
		}
	}
}
